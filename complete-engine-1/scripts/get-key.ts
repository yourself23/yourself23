import { ethers } from "ethers";
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
