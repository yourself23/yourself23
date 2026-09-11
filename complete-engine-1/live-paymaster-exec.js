const { Coinbase, Wallet } = require('@coinbase/coinbase-sdk');

async function runSponsoredOp() {
  try {
    console.log("--- INITIALIZING COINBASE SDK FOR BASE MAINNET ---");
    
    Coinbase.configure({
      apiKeyName: process.env.CDP_API_KEY_NAME || "",
      privateKey: process.env.CDP_PRIVATE_KEY || "",
      useServerSigner: true
    });

    const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
    const hxProofValue = "450000000";

    console.log(`Target Destination: ${destination}`);
    console.log(`Payload Proof: ${hxProofValue} hx`);
    console.log("Requesting gas-sponsored transaction via network policy...");

    const wallet = await Wallet.create({ networkId: "base-mainnet" });
    console.log(`Associated Server Wallet Address: ${wallet.getData().address}`);

    const transfer = await wallet.createTransfer({
      amount: 0,
      destination: destination,
      assetId: "eth",
      gasless: true
    });

    await transfer.wait();
    console.log("Success! Gas-sponsored transaction executed live on Base mainnet.");
    console.log(`Transaction Hash: ${transfer.getTransactionHash()}`);

  } catch (error) {
    console.error("Execution Note:", error.message);
  }
}

runSponsoredOp();
