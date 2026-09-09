require("dotenv").config();
const { ethers } = require("ethers");

const pk = process.env.PRIVATE_KEY;
console.log("ENV PRIVATE_KEY length:", pk?.length);
console.log("ENV PRIVATE_KEY starts with 0x:", pk?.startsWith("0x"));

if (pk) {
  const wallet = new ethers.Wallet(pk);
  console.log("Successfully instantiated wallet address:", wallet.address);
} else {
  console.log("PRIVATE_KEY is missing or undefined.");
}
