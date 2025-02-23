import { useMemo } from "react";
import { parseEther } from "viem";
import { useNetwork } from "wagmi";
import { ChainId, PAIR_ADDRESS } from "../../../sdk";
import {
  usePairSyncToL1,
  usePreparePairSyncToL1,
} from "../../../src/generated";
import useToast from "../useToast";

export default function useSyncL1(): {
  sync: () => void;
} {
  const { chain } = useNetwork();

  const ammAddress = useMemo(() => {
    if (!chain) return;

    if (chain.id === ChainId.ARBITRUM_GOERLI) {
      return PAIR_ADDRESS[ChainId.ARBITRUM_GOERLI];
    }
    if (chain.id === ChainId.POLYGON_MUMBAI) {
      return PAIR_ADDRESS[ChainId.POLYGON_MUMBAI];
    }
  }, [chain]);

  const { config } = usePreparePairSyncToL1({
    address: ammAddress as `0x${string}`,
    args: [parseEther("0.1"), parseEther("0.2")],
    value: parseEther("0.5"),
    enabled: !!chain,
  });

  const { write, data } = usePairSyncToL1(config);

  useToast(
    data?.hash,
    "Syncing to L1...",
    "Synced to L1!",
    "Failed to sync to L1"
  );

  return {
    sync: () => write?.(),
  };
}
