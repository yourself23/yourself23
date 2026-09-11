import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { StandaloneDaiVaultArtifact } from "../artifacts/StandaloneDaiVault";

const VAULT_CONTRACT_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; 
const SYSTEM_DESTINATION_WALLET = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";

export interface TrustWalletState {
    account: string | null;
    isConnected: boolean;
    isConnecting: boolean;
    vaultBalance: string;
    replenishmentThreshold: string;
    error: string | null;
}

export const useTrustWallet = () => {
    const [state, setState] = useState<TrustWalletState>({
        account: null,
        isConnected: false,
        isConnecting: false,
        vaultBalance: "0",
        replenishmentThreshold: "0",
        error: null,
    });

    const getProvider = useCallback(() => {
        if (typeof window === "undefined" || !window.ethereum) return null;
        if (window.ethereum.isTrust) return window.ethereum;
        if (window.ethereum.providers?.length) {
            const trustProvider = window.ethereum.providers.find((p: any) => p.isTrust);
            if (trustProvider) return trustProvider;
        }
        return window.ethereum;
    }, []);

    const fetchVaultParameters = useCallback(async (userAccount: string) => {
        const providerEnv = getProvider();
        if (!providerEnv) return;

        try {
            const browserProvider = new ethers.BrowserProvider(providerEnv);
            const contract = new ethers.Contract(
                VAULT_CONTRACT_ADDRESS,
                StandaloneDaiVaultArtifact.abi,
                browserProvider
            );

            const [balance, threshold] = await Promise.all([
                contract.DAI_TOKEN().then((tokenAddr: string) => {
                    const tokenContract = new ethers.Contract(
                        tokenAddr,
                        ["function balanceOf(address) view returns (uint256)"],
                        browserProvider
                    );
                    return tokenContract.balanceOf(SYSTEM_DESTINATION_WALLET);
                }),
                contract.replenishmentThreshold()
            ]);

            setState(prev => ({
                ...prev,
                vaultBalance: ethers.formatEther(balance),
                replenishmentThreshold: ethers.formatEther(threshold),
            }));
        } catch (err: any) {
            console.error("Telemetry sync failure:", err);
        }
    }, [getProvider]);

    const connectWallet = useCallback(async () => {
        const providerEnv = getProvider();
        if (!providerEnv) {
            setState(prev => ({ ...prev, error: "Trust Wallet extension not detected." }));
            return;
        }

        setState(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            const accounts = await providerEnv.request({ method: "eth_requestAccounts" });
            const connectedAccount = accounts[0];

            setState(prev => ({
                ...prev,
                account: connectedAccount,
                isConnected: true,
                isConnecting: false,
            }));

            await fetchVaultParameters(connectedAccount);
        } catch (err: any) {
            setState(prev => ({
                ...prev,
                isConnecting: false,
                error: err.message || "User rejected connection request.",
            }));
        }
    }, [getProvider, fetchVaultParameters]);

    const triggerAutoReplenish = useCallback(async () => {
        const providerEnv = getProvider();
        if (!providerEnv || !state.account) return false;

        try {
            const browserProvider = new ethers.BrowserProvider(providerEnv);
            const signer = await browserProvider.getSigner();
            const contract = new ethers.Contract(
                VAULT_CONTRACT_ADDRESS,
                StandaloneDaiVaultArtifact.abi,
                signer
            );

            const tx = await contract.executeAutoReplenish();
            await tx.wait();
            
            await fetchVaultParameters(state.account);
            return true;
        } catch (err: any) {
            setState(prev => ({ ...prev, error: err.reason || err.message }));
            return false;
        }
    }, [getProvider, state.account, fetchVaultParameters]);

    useEffect(() => {
        const providerEnv = getProvider();
        if (!providerEnv) return;

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                setState(prev => ({ ...prev, account: null, isConnected: false }));
            } else {
                setState(prev => ({ ...prev, account: accounts[0], isConnected: true }));
                fetchVaultParameters(accounts[0]);
            }
        };

        providerEnv.on("accountsChanged", handleAccountsChanged);
        return () => {
            if (providerEnv.removeListener) {
                providerEnv.removeListener("accountsChanged", handleAccountsChanged);
            }
        };
    }, [getProvider, fetchVaultParameters]);

    return {
        ...state,
        connectWallet,
        triggerAutoReplenish,
        refreshMetrics: () => state.account && fetchVaultParameters(state.account)
    };
};
