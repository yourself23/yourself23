"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { STANDALONE_DAI_VAULT_ADDRESS, DAI_ADDRESS, STANDALONE_DAI_VAULT_ABI } from "@/config/contracts";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) view returns (uint256)"
];

export default function VaultInteraction() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function getProviderAndSigner() {
    if (!window.ethereum) throw new Error("No crypto wallet found. Please install MetaMask or Coinbase Wallet.");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  }

  async function handleDeposit() {
    try {
      setStatus("Connecting wallet...");
      const { signer } = await getProviderAndSigner();
      
      const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, signer);
      const vaultContract = new ethers.Contract(STANDALONE_DAI_VAULT_ADDRESS, STANDALONE_DAI_VAULT_ABI, signer);

      const parsedAmount = ethers.parseEther(amount || "0");
      if (parsedAmount <= 0n) throw new Error("Enter a valid deposit amount.");

      setStatus("Approving DAI transfer...");
      const approveTx = await daiContract.approve(STANDALONE_DAI_VAULT_ADDRESS, parsedAmount);
      await approveTx.wait();

      setStatus("Depositing into Vault...");
      const depositTx = await vaultContract.deposit(parsedAmount);
      await depositTx.wait();

      setStatus("Deposit successful!");
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message || err}`);
    }
  }

  async function handleWithdraw() {
    try {
      setStatus("Connecting wallet...");
      const { signer } = await getProviderAndSigner();
      const vaultContract = new ethers.Contract(STANDALONE_DAI_VAULT_ADDRESS, STANDALONE_DAI_VAULT_ABI, signer);

      const parsedAmount = ethers.parseEther(amount || "0");
      if (parsedAmount <= 0n) throw new Error("Enter a valid withdrawal amount.");

      setStatus("Withdrawing from Vault...");
      const withdrawTx = await vaultContract.withdraw(parsedAmount);
      await withdrawTx.wait();

      setStatus("Withdrawal successful!");
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message || err}`);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-900 rounded-xl shadow-md text-white border border-zinc-800">
      <h2 className="text-xl font-bold mb-4">Standalone DAI Vault</h2>
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-1">Amount (DAI)</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleDeposit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium transition"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdraw}
          className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-2 rounded-lg font-medium transition"
        >
          Withdraw
        </button>
      </div>
      {status && <p className="text-sm text-zinc-400">{status}</p>}
    </div>
  );
}
