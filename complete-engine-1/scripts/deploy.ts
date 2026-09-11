import { ethers, artifacts } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const daiAddress = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";
  const Vault = await ethers.getContractFactory("StandaloneDaiVault");
  const vault = await Vault.deploy(daiAddress);
  await vault.waitForDeployment();
  
  const address = await vault.getAddress();
  console.log(`StandaloneDaiVault deployed to: ${address}`);

  const artifact = await artifacts.readArtifact("StandaloneDaiVault");
  const abiDir = path.join(__dirname, "../src/abis");
  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(abiDir, "StandaloneDaiVault.json"),
    JSON.stringify(artifact.abi, null, 2)
  );
  console.log("ABI exported to src/abis/StandaloneDaiVault.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
