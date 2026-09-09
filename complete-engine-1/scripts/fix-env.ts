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
console.log("Length:", wallet.privateKey.length);

let envContent = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";

// Remove old PRIVATE_KEY and DEPLOYER_ADDRESS lines
envContent = envContent.replace(/^PRIVATE_KEY=.*$/gm, "").replace(/^DEPLOYER_ADDRESS=.*$/gm, "");
envContent = envContent.trim() + `\nPRIVATE_KEY=${wallet.privateKey}\nDEPLOYER_ADDRESS=${wallet.address}\n`;

fs.writeFileSync(".env", envContent);
console.log("Fixed .env file successfully.");
