'use client';
import { useState } from 'react';

export default function VaultInteraction() {
  const [amount, setAmount] = useState('');
  const vaultAddress = process.env.NEXT_PUBLIC_STANDALONE_DAI_VAULT_ADDRESS;
  const daiAddress = process.env.NEXT_PUBLIC_DAI_ADDRESS;

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
        <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">Deposit</button>
        <button className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-md hover:bg-slate-300 transition">Withdraw</button>
      </div>
    </div>
  );
}
