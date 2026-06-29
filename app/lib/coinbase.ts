// lib/coinbase.ts

import { createCoinbaseWalletSDK } from "@coinbase/wallet-sdk";

let sdk: ReturnType<typeof createCoinbaseWalletSDK> | null = null;

export function getCoinbaseSDK() {
  if (typeof window === "undefined") {
    throw new Error("Coinbase Wallet SDK can only be used in the browser.");
  }

  if (!sdk) {
    sdk = createCoinbaseWalletSDK({
      appName: "ImmutableASCII NFT",
      appChainIds: [8453],
    });
  }

  return sdk;
}

export function getProvider() {
  return getCoinbaseSDK().getProvider();
}
