const { createWalletClient, createPublicClient, http, parseEther } = require('viem');
const { base } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');

async function main() {
  const rpcUrl = process.env.RPC_URL || process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const publicClient = createPublicClient({
    chain: base,
    transport: http(rpcUrl)
  });

  const destination = '0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7';
  const transferAmount = '15'; // ETH

  // Using your configured private key or credential secret
  const privateKey = process.env.PRIVATE_KEY || "0xc29397637841ef315705a2e994e637fb963161c169ae0d8d5757962635bc51cf"; // fallback or environment check

  console.log("----------------------------------------");
  console.log("Executing Transfer Payload:");
  console.log("Target:", destination);
  console.log("Amount:", transferAmount, "ETH");
  console.log("----------------------------------------");

  try {
    const account = privateKeyToAccount(privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`);
    const walletClient = createWalletClient({
      account,
      chain: base,
      transport: http(rpcUrl)
    });

    const hash = await walletClient.sendTransaction({
      to: destination,
      value: parseEther(transferAmount)
    });

    console.log("SUCCESS - Transaction Broadcasted Hash:", hash);
  } catch (err) {
    console.error("Broadcast Error:", err.message);
  }
}

main();
