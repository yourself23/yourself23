const { createPublicClient, http } = require('viem');
const { base } = require('viem/chains');

async function main() {
  const rpcUrl = process.env.RPC_URL || process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const client = createPublicClient({
    chain: base,
    transport: http(rpcUrl)
  });

  const targetAddress = '0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7';
  console.log("----------------------------------------");
  console.log("Running Final Engine Script for:", targetAddress);
  console.log("Using RPC Target:", rpcUrl);
  console.log("----------------------------------------");

  try {
    const balance = await client.getBalance({ address: targetAddress });
    const code = await client.getCode({ address: targetAddress });
    
    console.log("SUCCESS - Target Balance:", balance.toString(), "Wei");
    console.log("SUCCESS - Bytecode Verified:", code !== '0x' ? "Active Contract" : "EOA");
  } catch (err) {
    console.error("Engine Execution Error:", err.message);
  }
}

main();
