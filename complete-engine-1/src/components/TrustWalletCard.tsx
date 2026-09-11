import React from "react";
import { useTrustWallet } from "../useTrustWallet";

export const TrustWalletCard: React.FC = () => {
    const {
        account,
        isConnected,
        isConnecting,
        vaultBalance,
        replenishmentThreshold,
        error,
        connectWallet,
        triggerAutoReplenish,
        refreshMetrics,
    } = useTrustWallet();

    const needsRefill = parseFloat(vaultBalance) < parseFloat(replenishmentThreshold);

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl text-white font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <h2 className="text-xl font-bold tracking-tight">Willstone Vault Console</h2>
                <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
            </div>

            {error && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg">
                    {error}
                </div>
            )}

            {!isConnected ? (
                <div className="text-center py-6">
                    <p className="text-slate-400 text-sm mb-6">
                        Connect your secure mobile Trust Wallet instance to monitor and trigger automated gas reserve parameters.
                    </p>
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 text-white font-semibold rounded-lg shadow-lg active:scale-[0.98] transition-all duration-150"
                    >
                        {isConnecting ? "Connecting Extension..." : "Connect Trust Wallet"}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex items-center justify-between">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Active Signer</span>
                        <span className="text-sm font-mono text-slate-300">
                            {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ""}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
                            <span className="block text-xs text-slate-500 uppercase font-semibold mb-1">Vault Reserve</span>
                            <span className="text-lg font-mono font-bold text-white">{vaultBalance} DAI</span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
                            <span className="block text-xs text-slate-500 uppercase font-semibold mb-1">Trigger Floor</span>
                            <span className="text-lg font-mono font-bold text-slate-400">{replenishmentThreshold} DAI</span>
                        </div>
                    </div>

                    <div className={`p-3 rounded-lg text-sm flex items-center justify-between ${needsRefill ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"}`}>
                        <span>System Status:</span>
                        <span className="font-semibold uppercase tracking-wider text-xs">
                            {needsRefill ? "Replenishment Required" : "Reserves Nominal"}
                        </span>
                    </div>

                    <div className="pt-2 space-y-2">
                        <button
                            onClick={triggerAutoReplenish}
                            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-md active:scale-[0.98] transition-all duration-150"
                        >
                            Execute Auto-Replenish Matrix
                        </button>
                        <button
                            onClick={refreshMetrics}
                            className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-750 text-slate-300 text-sm font-medium rounded-lg active:scale-[0.98] transition-all duration-150"
                        >
                            Refresh Live Telemetry
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
