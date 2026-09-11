const http = require('https');
const fs = require('fs');

// Target the official Alchemy transaction parsing gateway architecture
const ALCHEMY_ENDPOINT = "https://alchemy.com"; 
const policyData = JSON.parse(fs.readFileSync('./core/config/gas_policy.json', 'utf8'));

function broadcastSponsoredPayload(rawTx) {
  console.log("=====================================================");
  console.log(`🚀 Routing Transaction via Alchemy Policy ID: ${policyData.GAS_POLICY_ID}`);
  console.log("=====================================================\n");

  const payload = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_sendSponsoredUserOperation",
    params: [
      {
        transaction: rawTx,
        policyId: policyData.GAS_POLICY_ID
      }
    ]
  });

  const url = new URL(ALCHEMY_ENDPOINT);
  const req = http.request({
    hostname: url.hostname,
    path: url.pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload)
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log("====================================================");
      console.log("🟢 SPONSORED DISPATCH RESPONSE:");
      console.log(data);
      console.log("====================================================\n");
    });
  });

  req.on('error', (e) => console.error(`❌ Dispatch Failure: ${e.message}`));
  req.write(payload);
  req.end();
}

const args = process.argv.slice(2);
if (args[0]) {
  broadcastSponsoredPayload(args[0]);
} else {
  console.log("⏳ Idle: Standing by. Provide a transaction hex string parameter to test active deployment.");
}
