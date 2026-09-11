import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  console.error("No MNEMONIC found in environment variables.");
  process.exit(1);
}

const wallet = ethers.Wallet.fromPhrase(mnemonic.trim());
console.log("Derived Address:", wallet.address);
console.log("Derived Private Key:", wallet.privateKey);

let envContent = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";

if (envContent.includes("PRIVATE_KEY=")) {
  envContent = envContent.replace(/^PRIVATE_KEY=.*/m, `PRIVATE_KEY=${wallet.privateKey}`);
} else {
  envContent += `\nPRIVATE_KEY=${wallet.privateKey}\n`;
}

if (envContent.includes("DEPLOYER_ADDRESS=")) {
  envContent = envContent.replace(/^DEPLOYER_ADDRESS=.*/m, `DEPLOYER_ADDRESS=${wallet.address}`);
} else {
  envContent += `DEPLOYER_ADDRESS=${wallet.address}\n`;
}

fs.writeFileSync(".env", envContent);
console.log("Successfully updated .env with PRIVATE_KEY and DEPLOYER_ADDRESS.");
