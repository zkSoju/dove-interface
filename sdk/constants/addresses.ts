import { ChainId } from "../enums/chainId";

export const L1_ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x18e02D08CCEb8509730949954e904534768f1536",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.ARBITRUM_GOERLI]: "",
};

export const L2_ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x18e02D08CCEb8509730949954e904534768f1536",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.ARBITRUM_GOERLI]: "",
};

export const DOVE_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x18e02D08CCEb8509730949954e904534768f1536",
  [ChainId.POLYGON_MUMBAI]: "",
  [ChainId.ARBITRUM_GOERLI]: "",
};

export const PAIR_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "0xC51eFC8C3E3b8708c6f496FDa57ac33931CDB0c8",
  [ChainId.ARBITRUM_GOERLI]: "0xE7b3CcEb43b247664784836572af31dac522E148",
};

export const USDC_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620",
  [ChainId.POLYGON_MUMBAI]: "0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7",
  [ChainId.ARBITRUM_GOERLI]: "0x6aAd876244E7A1Ad44Ec4824Ce813729E5B6C291",
};

export const USDT_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "0x5BCc22abEC37337630C0E0dd41D64fd86CaeE951",
  [ChainId.POLYGON_MUMBAI]: "0x6Fc340be8e378c2fF56476409eF48dA9a3B781a0",
  [ChainId.ARBITRUM_GOERLI]: "0x533046F316590C19d99c74eE661c6d541b64471C",
};

export const vUSDC_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "0x06deC8AED375eEFAbFba6744B4dDa446b5276289",
  [ChainId.ARBITRUM_GOERLI]: "0x008e0d6DB3f74f0Dc3386F8fB3281C2e92e8335F",
};

export const vUSDT_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ETHEREUM_GOERLI]: "",
  [ChainId.POLYGON_MUMBAI]: "0xd71405Bb709bC3CB2e8377615a04046CC089b6Ef",
  [ChainId.ARBITRUM_GOERLI]: "0xc3078e1355DD5424B92bc777c08c6b15eA713aAE",
};
