import { createCoinbaseWalletSDK } from "@coinbase/wallet-sdk";

const sdk = createCoinbaseWalletSDK({
  appName: "ImmutableASCII NFT",
});

const provider = sdk.getProvider();

export default provider;
