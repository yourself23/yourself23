const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const mnemonicPhrase = process.env.MNEMONIC;
  if (!mnemonicPhrase) {
    throw new Error("Please set the MNEMONIC variable in your .env file.");
  }
  
  const sender = ethers.Wallet.fromPhrase(mnemonicPhrase.trim(), "m/44'/60'/0'/0/0");
  const provider = ethers.provider;
  const connectedSender = sender.connect(provider);

  console.log("Derived Sender Address:", connectedSender.address);

  const recipient = "0x39C8f221541f44762D6E4f9Cf8E678BE2FFf02B9";
  const balance = await provider.getBalance(connectedSender.address);
  console.log("Sender Balance:", ethers.formatEther(balance), "ETH");

  const feeData = await provider.getFeeData();
  const gasLimit = 21000n;
  const maxGasCost = (feeData.gasPrice || feeData.maxFeePerGas || ethers.parseUnits("0.01", "gwei")) * gasLimit;

  // Leave an extra buffer for slight gas price fluctuations
  const buffer = ethers.parseUnits("0.00005", "ether");
  const amount = balance - maxGasCost - buffer;

  if (amount <= 0n) {
    throw new Error("Sender balance is too low to cover gas fees for the transfer.");
  }

  console.log(`Sending ${ethers.formatEther(amount)} ETH to deployer ${recipient}...`);
  const tx = await connectedSender.sendTransaction({
    to: recipient,
    value: amount,
    gasLimit: gasLimit,
  });

  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Transfer complete and confirmed on-chain!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
