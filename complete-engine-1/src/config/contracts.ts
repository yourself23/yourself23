export const STANDALONE_DAI_VAULT_ADDRESS = process.env.NEXT_PUBLIC_STANDALONE_DAI_VAULT_ADDRESS || "0xe14225299233563d3deaaFFAaafE0CD7CC719662";
export const DAI_ADDRESS = process.env.NEXT_PUBLIC_DAI_ADDRESS || "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";

export const STANDALONE_DAI_VAULT_ABI = [
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 amount) external",
  "function balanceOf(address account) view returns (uint256)",
  "function totalSupply() view returns (uint256)"
];
