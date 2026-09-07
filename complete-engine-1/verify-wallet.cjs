const { createPublicClient, http } = require('viem');
const { base } = require('viem/chains');

async function main() {
  const rpcUrl = process.env.RPC_URL || process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const client = createPublicClient({
    chain: base,
    transport: http(rpcUrl)
  });

  const contractAddress = '0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7';
  console.log("----------------------------------------");
  console.log("Querying Contract:", contractAddress);
  console.log("----------------------------------------");

  try {
    const code = await client.getCode({ address: contractAddress });
    console.log("Bytecode Length:", code.length, "characters");

    // Try reading standard ERC20 token name if applicable
    const name = await client.readContract({
      address: contractAddress,
      abi: [{ name: 'name', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] }],
      args: []
    }).catch(() => "N/A or Not ERC20 Name");

    console.log("Contract Token Name:", name);
  } catch (err) {
    console.error("Contract Read Error:", err.message);
  }
}

main();
