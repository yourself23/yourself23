const LOCAL_HOST = "http://localhost:3000";

async function executeApiTestSuite() {
    console.log("=====================================================");
    console.log("🚀 Starting Willstone Nexus Local API Route Validation");
    console.log("=====================================================\n");

    // --- TEST VECTOR 1: GET /api/balance ---
    try {
        console.log("📡 [PIPE-01]: Querying Live Balance Read Telemetry...");
        const balanceRes = await fetch(`${LOCAL_HOST}/api/balance`);
        const balanceData = await balanceRes.json();
        
        if (balanceData.success) {
            console.log("✅ Success: Balance telemetry verified smoothly.");
            console.log(`   Operator Address: ${balanceData.operator}`);
            console.log(`   Arbitrum Balance: ${balanceData.balances.arbitrum} ETH`);
            console.log(`   Base Balance:     ${balanceData.balances.base} ETH\n`);
        } else {
            console.log(`❌ Failed: Server returned fault block: ${balanceData.error}\n`);
        }
    } catch (error) {
        console.log(`❌ Error: Connection failed on balance channel: ${error.message}\n`);
    }

    // --- TEST VECTOR 2: POST /api/verify ---
    try {
        const payloadAddress = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
        console.log(`📡 [PIPE-02]: Sending Hexadecimal Vector Verification (${payloadAddress})...`);
        
        const verifyRes = await fetch(`${LOCAL_HOST}/api/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: payloadAddress })
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
            console.log("✅ Success: Cryptographic address check passed EIP-55 format rules.");
            console.log(`   Checksum Target:  ${verifyData.verifiedAddress}`);
            console.log(`   Server Timestamp: ${verifyData.timestamp}\n`);
        } else {
            console.log(`❌ Failed: Validation engine rejected format: ${verifyData.error}\n`);
        }
    } catch (error) {
        console.log(`❌ Error: Connection failed on verification channel: ${error.message}\n`);
    }

    console.log("=====================================================");
    console.log("🏁 Local Testing Pass Complete.");
    console.log("=====================================================");
}

executeApiTestSuite();
