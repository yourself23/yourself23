export const REINVESTMENT_CONFIG = {
  reinvestmentRate: 0.90,
  treasuryShare: 0.10,
  targetVault: "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7"
};
export function calculateProfitSplit(grossRevenue: bigint) {
  const reinvestmentAmount = (grossRevenue * BigInt(90)) / BigInt(100);
  const treasuryAmount = grossRevenue - reinvestmentAmount;
  return { reinvestmentAmount, treasuryAmount, vault: REINVESTMENT_CONFIG.targetVault };
}
