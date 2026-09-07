const { createPublicClient, http, encodeFunctionData } = require('viem');
const { base } = require('viem/chains');

async function main() {
  const client = createPublicClient({
    chain: base,
    transport: http(process.env.RPC_URL || process.env.BASE_RPC_URL || "https://mainnet.base.org")
  });

  console.log("Using RPC Target:", client.transport.url);

  try {
    const data = await client.readContract({
      address: '0xc7f0e17931b253f659ad8d36bf39ee',
      abi: [{
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }]
      }],
      args: ['0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7']
    });
    console.log("SUCCESS - Contract Response:", data.toString());
  } catch (err) {
    console.error("RPC Error Details:", err.message);
  }
}

main();
