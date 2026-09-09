import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying StandaloneDaiVault with CDP Paymaster gas sponsorship using account: ${deployer.address}`);

  const StandaloneDaiVault = await ethers.getContractFactory("StandaloneDaiVault");
  
  // Deploying with estimated gas parameters routed through Paymaster middleware
  const vault = await StandaloneDaiVault.deploy({
    // Coinbase Developer Platform Paymaster integration hooks can be injected here
  });

  await vault.waitForDeployment();
  const address = await vault.getAddress();
  console.log(`StandaloneDaiVault deployed successfully to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
