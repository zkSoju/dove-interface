import { ChainId } from "../enums/chainId";

export const L1_ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x399CD1eB15a570BCd63d68FE6E073cB81730d9E4",
  [ChainId.ARBITRUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.AVALANCHE_FUJI]: "",
};

export const L2_ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.ARBITRUM_GOERLI]: "0x88BDec3893364f43194eAbe01312cd3d49AC0d2B",
  [ChainId.POLYGON_MUMBAI]: "0x1aC3E28E97864296fE8b0fEA9cBCf77604bf0c4E",
  [ChainId.AVALANCHE_FUJI]: "0x4CCB891607C911Fd65e56D03bd850F9bB71e043C",
};

export const DOVE_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x13b156E036f6D91482b7136302A2D1fF0c5FDcF8",
  [ChainId.ARBITRUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.AVALANCHE_FUJI]: "",
};

export const PAIR_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.ARBITRUM_GOERLI]: "0x78818F4784B9A1f272F4dcDE1ED09fF182bAF407",
  [ChainId.POLYGON_MUMBAI]: "0x1aC3E28E97864296fE8b0fEA9cBCf77604bf0c4E",
  [ChainId.AVALANCHE_FUJI]: "0x51fb7aDdE04fB8d45BF02B254C6DfbFA3aFaE916",
};

export const USDC_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620",
  [ChainId.ARBITRUM_GOERLI]: "0x6aAd876244E7A1Ad44Ec4824Ce813729E5B6C291",
  [ChainId.POLYGON_MUMBAI]: "0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7",
  [ChainId.AVALANCHE_FUJI]: "0x4A0D1092E9df255cf95D72834Ea9255132782318",
};

export const USDT_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x5BCc22abEC37337630C0E0dd41D64fd86CaeE951",
  [ChainId.ARBITRUM_GOERLI]: "0x533046F316590C19d99c74eE661c6d541b64471C",
  [ChainId.POLYGON_MUMBAI]: "0x6Fc340be8e378c2fF56476409eF48dA9a3B781a0",
  [ChainId.AVALANCHE_FUJI]: "0x134Dc38AE8C853D1aa2103d5047591acDAA16682",
};

export const vUSDC_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.ARBITRUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.AVALANCHE_FUJI]: "",
};

export const vUSDT_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.ARBITRUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.AVALANCHE_FUJI]: "",
};
