import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No signers available. Check your PRIVATE_KEY configuration in hardhat.config.cjs and .env.");
  }
  const deployer = signers[0];
  console.log("Deployer Address:", deployer.address);

  // Correct checksummed Base Mainnet DAI address: 0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb
  const DAI_TOKEN_ADDRESS = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";
  
  // Verify checksum via Ethers
  const verifiedDaiAddress = ethers.getAddress(DAI_TOKEN_ADDRESS);
  console.log("Verified DAI Address:", verifiedDaiAddress);

  console.log("Deploying StandaloneDaiVault to Base mainnet...");
  const StandaloneDaiVault = await ethers.getContractFactory("StandaloneDaiVault");
  const vault = await StandaloneDaiVault.deploy(verifiedDaiAddress);

  await vault.waitForDeployment();
  const address = await vault.getAddress();

  console.log(`StandaloneDaiVault successfully deployed to Base mainnet at: ${address}`);
  console.log(`Contract Owner set to deployer: ${deployer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
