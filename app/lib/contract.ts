import { createWalletClient, custom, getContract } from "viem";
import { base } from "viem/chains";
import { getProvider } from "./coinbase";

const NFT_ABI = [
  {
    type: "function",
    name: "mint",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export function getContractInstance() {
  const provider = getProvider();

  if (!provider) {
    throw new Error("Provider not available");
  }

  const walletClient = createWalletClient({
    chain: base,
    transport: custom(provider),
  });

  return getContract({
    address: "0x5952a90311e8031B49e611E3bf91af4e7738D1e2",
    abi: NFT_ABI,
    client: walletClient,
  });
}
