import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const signers = await ethers.getSigners();
  if (!signers || signers.length === 0) {
    throw new Error("No deployer account available. Please configure your PRIVATE_KEY in .env or hardhat.config.ts.");
  }
  const deployer = signers[0];
  console.log("Deploying StandaloneDaiVault with account:", deployer.address);

  const StandaloneDaiVault = await ethers.getContractFactory("StandaloneDaiVault");
  const vault = await StandaloneDaiVault.deploy();
  await vault.waitForDeployment();

  const vaultAddress = await vault.getAddress();
  console.log("StandaloneDaiVault deployed to:", vaultAddress);

  const artifactPath = path.join(__dirname, "../artifacts/contracts/StandaloneDaiVault.sol/StandaloneDaiVault.json");
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const exportData = {
      address: vaultAddress,
      abi: artifact.abi
    };
    
    const targetDir = path.join(__dirname, "../src/abis");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(targetDir, "StandaloneDaiVault.json"),
      JSON.stringify(exportData, null, 2)
    );
    console.log("Exported contract address and ABI to src/abis/StandaloneDaiVault.json");
  } else {
    console.log("Hardhat artifact not found yet. Compile contracts first to generate the frontend export JSON.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
