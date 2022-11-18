import React from "react";
import { chain, useAccount } from "wagmi";
import InteractButton, { Button } from "./InteractButton";
import {
  BiExpandAlt,
  BiRefresh,
  BiCog,
  BiDollar,
  BiDownload,
  BiReceipt,
  BiCreditCardFront,
  BiStats,
} from "react-icons/bi";
import * as Tabs from "@radix-ui/react-tabs";
import { useState, useRef } from "react";
import InputWithBalance from "./InputWithBalance";
import useApproveToken, { ApprovalState } from "../lib/hooks/useApproval";
import { BigNumber } from "ethers";
import useTriggerToast from "../lib/hooks/useTriggerToast";
import JSBI from "jsbi";
import { ChainId, CurrencyAmount } from "../sdk";
import { DAMM_LP, USDC } from "../sdk/constants";
import { useTokenBalances } from "../lib/hooks/useTokenBalance";
import TabSlider from "./TabSlider";
import { Field, useSwapStore } from "../state/swap/useSwapStore";
import { useDerivedSwapInfo } from "../state/swap/useDerivedSwapInfo";
import { useDerivedMintInfo } from "../state/mint/useDerivedMintInfo";
import { useMintStore } from "../state/mint/useMintStore";
import useMint from "../lib/hooks/mint/useMint";
import useSyncL1 from "../lib/hooks/sync/useSyncL1";
import useSwap from "../lib/hooks/swap/useSwap";
import { useBurnStore } from "../state/burn/useBurnStore";
import useBurn from "../lib/hooks/burn/useBurn";
import { useDerivedBurnInfo } from "../state/burn/useDerivedBurnInfo";
import useDammData from "../lib/hooks/data/useDammData";
import { formatCurrencyAmount } from "../lib/utils/formatCurrencyAmount";
import useTokenApproval from "../lib/hooks/useTokenApproval";
import { useChainDefaults } from "../lib/hooks/useDefaults";

const SwapTabContent = ({ expectedChainId }: { expectedChainId: number }) => {
  const tabsData = [
    {
      id: "tab1",
      title: "Swap",
      icon: <BiRefresh className="ml-2 rounded-sm bg-white/5 p-px" />,
    },
    {
      id: "tab4",
      title: "Vouchers",
      icon: <BiCreditCardFront className="ml-2 rounded-sm bg-white/5 p-px" />,
    },
    {
      id: "tab5",
      title: "Reserves",
      icon: <BiStats className="ml-2 rounded-sm bg-white/5 p-px" />,
    },
    {
      id: "tab2",
      title: "Mint",
      icon: <BiDollar className="ml-2 rounded-sm bg-white/5 p-px" />,
    },
    {
      id: "tab3",
      title: "Sync",
      icon: <BiDownload className="ml-2 rounded-sm bg-white/5 p-px" />,
    },
  ];

  /////////////////////////////

  useChainDefaults();

  const { callback: toastCallback } = useTriggerToast();

  const [isSwapped, toggleSwap, fields, onUserInput] = useSwapStore((state) => [
    state.isSwapped,
    state.toggleSwap,
    state.fields,
    state.onUserInput,
  ]);

  const { parsedAmounts, currencies, currencyBalances } = useDerivedSwapInfo();

  const { callback: approveCallbackA, state: approveStateA } = useTokenApproval(
    parsedAmounts[Field.CURRENCY_A]
  );

  const { callback: swapCallback } = useSwap(
    parsedAmounts[Field.CURRENCY_A],
    parsedAmounts[Field.CURRENCY_B]
  );

  const handleTypeInput = (value: string) => {
    onUserInput(Field.CURRENCY_A, value);

    if (!parsedAmounts[Field.CURRENCY_A] || !data?.reserve0 || !data?.reserve1)
      return;

    onUserInput(
      Field.CURRENCY_B,
      parsedAmounts[Field.CURRENCY_A]
        .multiply(data.reserve1)
        .divide(data.reserve0.add(parsedAmounts[Field.CURRENCY_A]))
        .toFixed(6)
    );
  };

  const handleMax = () => {
    currencyBalances[Field.CURRENCY_A] &&
      onUserInput(
        Field.CURRENCY_A,
        currencyBalances[Field.CURRENCY_A].toExact()
      );
  };

  const handleApproveA = () => {
    approveCallbackA?.();
  };

  const handleSwap = () => {
    swapCallback?.();
  };

  /////////////////////////////

  const [mintFields, onUserInputMint] = useMintStore((state) => [
    state.fields,
    state.onUserInput,
  ]);

  const {
    parsedAmounts: mintAmounts,
    currencies: mintCurrency,
    currencyBalances: mintBalance,
  } = useDerivedMintInfo();

  const { callback: mintCallbackA } = useMint(mintAmounts[Field.CURRENCY_A]);

  const { callback: mintCallbackB } = useMint(mintAmounts[Field.CURRENCY_B]);

  const handleTypeMintA = (value: string) => {
    onUserInputMint(Field.CURRENCY_A, value);
  };

  const handleTypeMintB = (value: string) => {
    onUserInputMint(Field.CURRENCY_B, value);
  };

  const handleMintA = () => {
    mintCallbackA?.().then((txid) => {
      if (!mintAmounts[Field.CURRENCY_A] || !mintCurrency[Field.CURRENCY_A])
        return;
      toastCallback?.({
        title: "Minted",
        description: `You minted ${formatCurrencyAmount(
          mintAmounts[Field.CURRENCY_A],
          6
        )} ${mintCurrency[Field.CURRENCY_A]?.symbol}`,
        txid: txid.hash,
        type: "success",
      });
    });
  };

  const handleMintB = () => {
    mintCallbackB?.().then((txid) => {
      if (!mintAmounts[Field.CURRENCY_B] || !mintCurrency[Field.CURRENCY_B])
        return;
      toastCallback?.({
        title: "Minted",
        description: `You minted ${formatCurrencyAmount(
          mintAmounts[Field.CURRENCY_B],
          6
        )} ${mintCurrency[Field.CURRENCY_B]?.symbol}`,
        txid: txid.hash,
        type: "success",
      });
    });
  };

  /////////////////////////////

  const { callback: syncCallback } = useSyncL1();

  const handleSync = () => {
    syncCallback?.();
  };

  /////////////////////////////

  const [burnFields, onUserInputBurn] = useBurnStore((state) => [
    state.fields,
    state.onUserInput,
  ]);

  const {
    parsedAmounts: burnAmounts,
    currencies: burnCurrencies,
    currencyBalances: burnBalances,
  } = useDerivedBurnInfo();

  const { callback: approveCallbackVoucherA, state: approveVoucherStateA } =
    useTokenApproval(burnAmounts[Field.CURRENCY_A]);

  const { callback: approveCallbackVoucherB, state: approveVoucherStateB } =
    useTokenApproval(burnAmounts[Field.CURRENCY_B]);

  const { callback: burnCallback } = useBurn(
    burnAmounts[Field.CURRENCY_A],
    burnAmounts[Field.CURRENCY_B]
  );

  const handleTypeBurnA = (value: string) => {
    onUserInputBurn(Field.CURRENCY_A, value);
  };

  const handleTypeBurnB = (value: string) => {
    onUserInputBurn(Field.CURRENCY_B, value);
  };

  const handleApproveVoucherA = () => {
    approveCallbackVoucherA?.();
  };

  const handleApproveVoucherB = () => {
    approveCallbackVoucherB?.();
  };

  const handleBurn = () => {
    burnCallback?.();
  };

  /////////////////////////////

  const { data } = useDammData(
    currencies[Field.CURRENCY_A],
    currencies[Field.CURRENCY_B],
    DAMM_LP[ChainId.ETHEREUM_GOERLI]
  );

  return (
    <TabSlider tabsData={tabsData}>
      <Tabs.Content value="tab1">
        <InputWithBalance
          currency={currencies[Field.CURRENCY_A]}
          balance={currencyBalances[Field.CURRENCY_A]}
          onUserInput={handleTypeInput}
          showMaxButton={true}
          onMax={handleMax}
          value={fields[Field.CURRENCY_A]}
        />
        <div className="relative left-1/2 z-10 -my-12 -mb-8 flex h-20 w-fit -translate-x-1/2 items-center justify-center">
          <button className="group" onClick={toggleSwap}>
            <BiExpandAlt className="-rotate-45 border border-white/10 bg-[#26272b] text-2xl text-white/50 transition ease-in-out group-hover:scale-110 group-hover:text-white" />
          </button>
        </div>
        <InputWithBalance
          currency={currencies[Field.CURRENCY_B]}
          balance={currencyBalances[Field.CURRENCY_B]}
          showMaxButton={false}
          value={fields[Field.CURRENCY_B]}
          disabled
        />
        <InteractButton
          onConfirm={handleSwap}
          expectedChainId={expectedChainId}
          text="Swap"
        >
          {(() => {
            if (
              !parsedAmounts[Field.CURRENCY_A] ||
              !parsedAmounts[Field.CURRENCY_B]
            ) {
              return <Button disabled text="Enter an amount" />;
            }

            if (approveStateA === ApprovalState.NOT_APPROVED) {
              return (
                <Button
                  onClick={handleApproveA}
                  text={`Approve ${currencies[Field.CURRENCY_A]?.symbol}`}
                />
              );
            }
          })()}
        </InteractButton>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <InputWithBalance
          currency={mintCurrency[Field.CURRENCY_A]}
          balance={mintBalance[Field.CURRENCY_A]}
          onUserInput={handleTypeMintA}
          showMaxButton={false}
          value={mintFields[Field.CURRENCY_A]}
        />
        <div className="relative mb-4">
          <InteractButton
            onConfirm={handleMintA}
            expectedChainId={expectedChainId}
            text="Mint"
          />
        </div>
        <InputWithBalance
          currency={mintCurrency[Field.CURRENCY_B]}
          balance={mintBalance[Field.CURRENCY_B]}
          onUserInput={handleTypeMintB}
          showMaxButton={false}
          value={mintFields[Field.CURRENCY_B]}
        />
        <InteractButton
          onConfirm={handleMintB}
          expectedChainId={expectedChainId}
          text="Mint"
        />
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <InteractButton
          expectedChainId={expectedChainId}
          onConfirm={handleSync}
          text="Sync to L1"
        />
      </Tabs.Content>
      <Tabs.Content value="tab4">
        <p className="mb-2 text-white ">dAMM Available Reserves</p>
        <div className="mb-1 flex w-full items-start justify-between rounded-sm py-2">
          <p className="text-sm text-white/50">USDC</p>
          <p className="text-sm text-white">
            {data?.marked0 && formatCurrencyAmount(data.marked0, 6)}
          </p>
        </div>
        <div className="mb-4 flex w-full items-start justify-between rounded-sm py-2">
          <p className="text-sm text-white/50">USDT</p>
          <p className="text-sm text-white">
            {data?.marked1 && formatCurrencyAmount(data.marked1, 6)}
          </p>
        </div>
        <InputWithBalance
          currency={burnCurrencies[Field.CURRENCY_A]}
          balance={burnBalances[Field.CURRENCY_A]}
          onUserInput={handleTypeBurnA}
          showMaxButton={false}
          value={burnFields[Field.CURRENCY_A]}
        />
        <InputWithBalance
          currency={burnCurrencies[Field.CURRENCY_B]}
          balance={burnBalances[Field.CURRENCY_B]}
          onUserInput={handleTypeBurnB}
          showMaxButton={false}
          value={burnFields[Field.CURRENCY_B]}
        />
        <InteractButton
          expectedChainId={expectedChainId}
          onConfirm={handleBurn}
          text="Burn Vouchers"
        >
          {(() => {
            if (
              !data?.marked0 ||
              !data?.marked1 ||
              !burnAmounts[Field.CURRENCY_A] ||
              !burnAmounts[Field.CURRENCY_B]
            ) {
              return <Button disabled text="Enter an amount" />;
            }

            if (
              burnAmounts[Field.CURRENCY_A].greaterThan(data.marked0) ||
              burnAmounts[Field.CURRENCY_B].greaterThan(data.marked1)
            ) {
              return <Button disabled text="Sync before" />;
            }
            if (
              !burnAmounts[Field.CURRENCY_A] ||
              !burnAmounts[Field.CURRENCY_B]
            ) {
              return <Button disabled text="Enter an amount" />;
            }
            if (approveVoucherStateA === ApprovalState.NOT_APPROVED) {
              return (
                <Button
                  onClick={handleApproveVoucherA}
                  text={`Approve ${burnCurrencies[Field.CURRENCY_A]?.symbol}`}
                />
              );
            }
            if (approveVoucherStateB === ApprovalState.NOT_APPROVED) {
              return (
                <Button
                  onClick={handleApproveVoucherB}
                  text={`Approve ${burnCurrencies[Field.CURRENCY_B]?.symbol}`}
                />
              );
            }
          })()}
        </InteractButton>
      </Tabs.Content>

      <Tabs.Content value="tab5">
        <div className="flex w-full flex-col items-start">
          <p className="mb-2 font-thin tracking-widest text-white">
            Virtual Reserve 1 <span className="text-white/50">(USDT)</span>
          </p>
          <h3 className="mb-8 text-white">
            {data?.reserve0 && formatCurrencyAmount(data.reserve0, 6)}
          </h3>
        </div>
        <div className="flex w-full flex-col items-start">
          <div className="mb-8 h-px w-full bg-white/5" />
          <p className="mb-2 font-thin tracking-widest text-white">
            Virtual Reserve 2 <span className="text-white/50">(USDC)</span>
          </p>
          <h3 className="mb-2 text-white">
            {data?.reserve1 && formatCurrencyAmount(data.reserve1, 6)}
          </h3>
        </div>
      </Tabs.Content>
    </TabSlider>
  );
};

export default SwapTabContent;
