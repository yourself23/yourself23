const { Coinbase, Wallet } = require('@coinbase/coinbase-sdk');

async function executeLivePipeline() {
  try {
    console.log("--- WILLSTONE NEXUS: LIVE GAS-SPONSORED PIPELINE ---");
    
    Coinbase.configure({
      apiKeyName: process.env.CDP_API_KEY_NAME || "",
      privateKey: process.env.CDP_PRIVATE_KEY || "",
      useServerSigner: true
    });

    const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
    const hxProofValue = "450000000";

    console.log(`Target Wallet: ${destination}`);
    console.log(`Payload Proof: ${hxProofValue} hx`);

    const wallet = await Wallet.create({ networkId: Coinbase.networks.BaseMainnet });
    console.log(`Signer Wallet Address: ${wallet.getData().address}`);

    const transfer = await wallet.createTransfer({
      amount: 0.00001,
      assetId: Coinbase.assets.Usdc,
      destination: destination,
      gasless: true
    });

    await transfer.wait();
    console.log("Success! Transaction broadcasted live with paymaster gas sponsorship.");
    console.log(`Transaction Hash: ${transfer.getTransactionHash()}`);
  } catch (err) {
    console.error("Pipeline Execution Error:", err.message);
  }
}

executeLivePipeline();
