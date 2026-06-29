import { getProvider } from "./coinbase";

export async function connectWallet() {
  const provider = getProvider();

  if (!provider) throw new Error("Provider not available");

  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];

  return accounts[0];
}

export async function getCurrentAccount() {
  const provider = getProvider();

  if (!provider) return null;

  const accounts = (await provider.request({
    method: "eth_accounts",
  })) as string[];

  return accounts[0] ?? null;
}
