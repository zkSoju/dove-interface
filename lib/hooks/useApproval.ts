import { BigNumber, BigNumberish, ethers } from "ethers";
import { useEffect, useMemo, useCallback } from "react";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Currency, CurrencyAmount } from "../../sdk";
import useTriggerToast from "./useTriggerToast";
import { MaxUint256 } from "@ethersproject/constants";
import { SendTransactionResult } from "@wagmi/core";

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

export default function useApproval(
  amountToApprove: CurrencyAmount<Currency> | undefined,
  spender: string | undefined
): {
  callback: null | (() => Promise<SendTransactionResult>);
  state: ApprovalState;
} {
  const tokenContract = {
    address: amountToApprove?.currency?.isToken
      ? amountToApprove.currency.address
      : undefined,
    abi: erc20ABI,
  };

  const approvalState = useApprovalStateForSpender(spender, amountToApprove);

  const { config: approvalConfig } = usePrepareContractWrite({
    ...tokenContract,
    functionName: "approve",
    args: [
      spender as `0x${string}`,
      amountToApprove?.numerator.toString() as any,
    ],
  });

  const { writeAsync } = useContractWrite(approvalConfig);

  if (!writeAsync || !amountToApprove)
    return { callback: null, state: approvalState };

  return {
    callback: async () => await writeAsync(),
    state: approvalState,
  };
}

function useApprovalStateForSpender(
  spender: string | undefined,
  amountToApprove: CurrencyAmount<Currency> | undefined
): ApprovalState {
  const { address } = useAccount();

  const tokenContract = {
    address: amountToApprove?.currency?.isToken
      ? amountToApprove.currency.address
      : undefined,
    abi: erc20ABI,
  };

  const { data: allowance } = useContractRead({
    ...tokenContract,
    functionName: "allowance",
    args: [address!, spender as `0x${string}`],
    watch: true,
  });

  if (!amountToApprove) return ApprovalState.UNKNOWN;
  if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;
  if (!allowance) return ApprovalState.UNKNOWN;

  return CurrencyAmount.fromRawAmount(
    amountToApprove.currency,
    allowance.toString()
  ).greaterThan(amountToApprove)
    ? ApprovalState.NOT_APPROVED
    : ApprovalState.APPROVED;
}
