const { ethers } = require("./complete-engine-1/node_modules/ethers");

async function checkPaymasterConnection() {
    const apiKeyName = "363024d1-8932-49c8-87ac-47dd2097d0bb";
    const apiSecret = "xylvviPDmXE7rRdQe3oIX1K8IdxdUoEHkVyx9Fj/YG/bMnOPch1etaWdL7IoOw9ebogG6u";
    const paymasterUrl = "https://coinbase.com";
    const targetAccount = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";

    console.log("=========================================================================");
    console.log("📡 Querying Coinbase Developer Platform Paymaster Connection Pipeline...");
    console.log("=========================================================================\n");

    try {
        const fetchProvider = new ethers.FetchRequest(paymasterUrl);
        fetchProvider.method = "POST";
        fetchProvider.setHeader("Content-Type", "application/json");
        fetchProvider.setHeader("X-API-Key-Name", apiKeyName);
        fetchProvider.setHeader("X-API-Secret", apiSecret);

        // Build a perfectly structured UserOperation object structure conforming to ERC-7677
        const rpcPayload = {
            jsonrpc: "2.0",
            id: 1,
            method: "pm_getPaymasterStubData",
            params: [
                {
                    sender: targetAccount,
                    nonce: "0x0",
                    initCode: "0x",
                    callData: "0x",
                    callGasLimit: "0x5208",
                    verificationGasLimit: "0x186a0",
                    preVerificationGas: "0x5208",
                    maxFeePerGas: "0x3b9aca00",
                    maxPriorityFeePerGas: "0x3b9aca00"
                },
                "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // EntryPoint Coordinates V0.6
                "0x2105" // Base Mainnet Chain ID Hex
            ]
        };

        fetchProvider.body = JSON.stringify(rpcPayload);
        
        console.log("📡 Sending cryptographic handshake data down to the node...");
        const response = await fetchProvider.send();
        const resultText = response.bodyText;

        console.log("\n=========================================================================");
        console.log("📦 PAYMASTER DATA CHANNEL FEEDBACK RECEIVED");
        console.log("=========================================================================");
        console.log(JSON.stringify(JSON.parse(resultText), null, 2));
        console.log("=========================================================================\n");

    } catch (error) {
        console.error(`\n❌ Network Check Failed to Complete: ${error.message}\n`);
    }
}

checkPaymasterConnection();
