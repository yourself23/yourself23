"use client";

import React, { useState } from "react";
import { useSilentWallet } from "../hooks/useSilentWallet";

export function UnifiedPoolDashboard() {
  const { isConnected, address, connectPersonal } = useSilentWallet();
  const [activeTab, setActiveTab] = useState<"overview" | "pool" | "wallet" | "token" | "staking">("overview");
  const [bgTheme, setBgTheme] = useState<"circuit" | "neural" | "mystic" | "gold">("circuit");

  // Theme background mappings
  const bgStyles = {
    circuit: "bg-slate-950 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]",
    neural: "bg-emerald-950 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_60%)]",
    mystic: "bg-slate-900 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,235,0.25),transparent_70%)]",
    gold: "bg-amber-950 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_70%)]",
  };

  return (
    <div className={`min-h-screen text-emerald-50 p-4 md:p-8 space-y-6 font-sans antialiased relative overflow-hidden transition-colors duration-500 ${bgStyles[bgTheme]}`}>
      
      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/40 rounded-3xl shadow-[0_0_50px_-10px_rgba(147,51,235,0.4)]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center bg-slate-950 border-2 border-amber-400 rounded-2xl shadow-[0_0_25px_0_rgba(245,158,11,0.6)]">
            <span className="text-3xl font-black text-amber-400 font-mono">3a</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
              SILENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-400">TRUST</span>
            </h1>
            <p className="text-sm font-semibold text-amber-400/90">Boilerplate State Function & Engine</p>
          </div>
        </div>
        
        {/* Theme Switcher & Wallet Connect */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            {(["circuit", "neural", "mystic", "gold"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setBgTheme(t)}
                className={`px-3 py-1.5 rounded-lg font-mono uppercase transition ${bgTheme === t ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {!isConnected ? (
            <button onClick={connectPersonal} className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-600 text-slate-950 font-black text-xs rounded-xl hover:opacity-90 transition shadow-[0_0_20px_0_rgba(16,185,129,0.5)]">
              Connect Wallet
            </button>
          ) : (
            <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-mono font-bold">
              Connected ({address ? address.substring(0, 6) + "..." : "Active"})
            </div>
          )}
        </div>
      </div>

      {/* Main Grid with Interactive Side Panel */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Multi-Page Navigation Side Panel */}
        <div className="lg:col-span-1 p-4 bg-slate-900/90 backdrop-blur-md border-2 border-emerald-500/30 rounded-3xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 px-3 py-1">Interactive Views</h3>
            {[
              { id: "overview", label: "Dashboard Overview", icon: "🌌" },
              { id: "pool", label: "Trust Pool Reserves", icon: "🏛️" },
              { id: "wallet", label: "Wallet & Signers", icon: "🛡️" },
              { id: "token", label: "Token Creation (NEXUS)", icon: "⚡" },
              { id: "staking", label: "Trading & Staking TVL", icon: "💎" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-purple-600/20 border-2 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-3 bg-slate-950 border border-purple-500/30 rounded-2xl text-[10px] text-slate-400 font-mono text-center">
            MEV Guard: <span className="text-emerald-400 font-bold">Active & Secure</span>
          </div>
        </div>

        {/* Dynamic Detail View Panel */}
        <div className="lg:col-span-3 p-6 md:p-8 bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/40 rounded-3xl space-y-6">
          
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>🌌</span> System Overview & Liquidity Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-2 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <span className="text-xs font-mono text-amber-400">TOTAL POOL RESERVE</span>
                  <p className="text-3xl font-black text-white">$157,510,933.00</p>
                  <p className="text-xs text-emerald-400 font-mono">Secure Liquidity Vault Active</p>
                </div>
                <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-2xl space-y-2 shadow-[0_0_15px_rgba(147,51,235,0.1)]">
                  <span className="text-xs font-mono text-purple-400">TOTAL VOLUME PROCESSED</span>
                  <p className="text-3xl font-black text-white">$144,024,04</p>
                  <p className="text-xs text-amber-300 font-mono">Arbitrage Exchange Routing</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pool" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>🏛️</span> Trust Pool Reserves & Vaults
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-950 border border-emerald-500/30 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-emerald-400">PRIMARY LIQUIDITY RESERVE</span>
                  <p className="text-2xl font-black text-white">$157,510,933.00</p>
                  <p className="text-xs text-slate-300 font-mono">Mainnet Multi-Sig Secured</p>
                </div>
                <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-purple-400">STAKING & YIELD TVL</span>
                  <p className="text-2xl font-black text-amber-300">$221.05M <span className="text-xs text-purple-400">(38.4% APY)</span></p>
                  <p className="text-xs text-slate-300 font-mono">Optimized Stake Routing</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>🛡️</span> Wallet & Asset Control Center
              </h2>
              <div className="p-6 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-4 font-mono text-xs text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Primary Signer:</span>
                  <span className="text-emerald-400 font-bold">0x34b...cle7</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-slate-400">Treasury Address:</span>
                  <span className="text-purple-400 font-bold">4gP9K...y09n</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Arbitrage Exchange:</span>
                  <span className="text-amber-300 font-bold">0x4f41...00727</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "token" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>⚡</span> Token Creation Engine (NEXUS)
              </h2>
              <div className="p-6 bg-slate-950 border border-emerald-500/30 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg">B-01: ON-CHAIN</span>
                  <span className="text-xs text-amber-400 font-mono">Tax Split: 1.5%</span>
                </div>
                <p className="text-3xl font-black text-amber-400">NEXUS Token</p>
                <p className="text-xs font-mono text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 break-all">
                  Contract: 0x71C9F481cB90A2d3E448501c...
                </p>
              </div>
            </div>
          )}

          {activeTab === "staking" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>💎</span> Trading & Staking Engine
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-purple-400">TOTAL NET WORTH (309)</span>
                  <p className="text-2xl font-black text-white">$12,559,302</p>
                </div>
                <div className="p-5 bg-slate-950 border border-emerald-500/30 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-emerald-400">STAKING POOL TVL</span>
                  <p className="text-2xl font-black text-emerald-300">$221.05M <span className="text-xs text-amber-400">(38.4% APY)</span></p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
