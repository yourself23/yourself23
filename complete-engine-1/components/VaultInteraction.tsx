'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

const VAULT_ABI = [
  "function deposit(uint256 assets, address receiver) external returns (uint256 shares)",
  "function withdraw(uint256 shares, address receiver, address owner) external returns (uint256 assets)",
  "function balanceOfe(address account) view returns (uint256)"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) view returns (uint256)"
];

export default function VaultInteraction() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const vaultAddress = process.env.NEXT_PUBLIC_STANDALONE_DAI_VAULT_ADDRESS || "0xe14225299233563d3deaaFFAaafE0CD7CC719662";
  const daiAddress = process.env.NEXT_PUBLIC_DAI_ADDRESS || "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";

  async function handleDeposit() {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found. Please install MetaMask or Coinbase Wallet.");
      setStatus('Connecting wallet...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.signAsync ? await provider.getSigner() : await provider.getSigner();
      
      setStatus('Approving DAI...');
      const daiContract = new ethers.Contract(daiAddress, ERC20_ABI, signer);
      const parsedAmount = ethers.parseUnits(amount || "0", 18);
      
      const approveTx = await daiContract.approve(vaultAddress, parsedAmount);
      await approveTx.wait();

      setStatus('Depositing into Vault...');
      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer);
      const address = await signer.getAddress();
      const depositTx = await vaultContract.deposit(parsedAmount, address);
      await depositTx.wait();

      setStatus('Deposit successful!');
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.reason || err.message}`);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-slate-800">Standalone DAI Vault</h2>
      <div className="text-xs text-slate-500 break-all">
        <p>Vault: {vaultAddress}</p>
        <p>DAI: {daiAddress}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (DAI)</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex space-x-3">
        <button onClick={handleDeposit} className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">Deposit</button>
      </div>
      {status && <p className="text-xs text-slate-600 mt-2 font-mono">{status}</p>}
    </div>
  );
}
