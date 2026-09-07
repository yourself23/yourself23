import { useState, useEffect } from 'react';
import { createWalletClient, custom, getAddress } from 'viem';
import { mainnet, base } from 'viem/chains';

export function useSilentWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [walletClient, setWalletClient] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const connectPersonal = async () => {
    setError(null);
    try {
      if (typeof window === 'undefined' || !(window as any).ethereum) {
        throw new Error("No browser wallet detected. Please open via a Web3 browser or extension.");
      }

      // Request live accounts from window.ethereum
      const [rawAddress] = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      const formattedAddress = getAddress(rawAddress);
      
      // Initialize real Viem wallet client on Mainnet/Base mainnet pipeline
      const client = createWalletClient({
        account: formattedAddress,
        chain: base,
        transport: custom((window as any).ethereum)
      });

      setWalletClient(client);
      setAddress(formattedAddress);
      setIsConnected(true);
    } catch (err: any) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet");
    }
  };

  return { isConnected, address, walletClient, connectPersonal, error };
}
