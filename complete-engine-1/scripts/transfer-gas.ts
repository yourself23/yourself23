import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const recipient = "0x39C8f221541f44762D6E4f9Cf8E678BE2FFf02B9";
  
  console.log(`Transferring funds from active signer (${deployer.address}) to ${recipient}...`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Current balance: ${ethers.formatEther(balance)} ETH`);

  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || ethers.parseUnits("0.1", "gwei");
  const gasLimit = 21000n;
  const gasCost = gasPrice * gasLimit;

  if (balance <= gasCost) {
    throw new Error("Insufficient balance to cover transfer gas fee.");
  }

  const valueToSend = balance - gasCost;

  const tx = await deployer.sendTransaction({
    to: recipient,
    value: valueToSend,
    gasLimit: gasLimit,
    gasPrice: gasPrice
  });

  console.log(`Transaction submitted: ${tx.hash}`);
  await tx.wait();
  console.log("Transfer complete and confirmed on-chain!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
