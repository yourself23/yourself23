const https = require('https');

async function sendLiveTransaction() {
  const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
  const rpcUrl = "https://mainnet.base.org";

  console.log("--- WILLSTONE NEXUS: LIVE BASE MAINNET BROADCAST ---");
  console.log(`Target Destination: ${destination}`);
  console.log(`Connecting to RPC Endpoint: ${rpcUrl}`);

  const requestData = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_getBalance",
    params: [destination, "latest"],
    id: 1
  });

  const url = new URL(rpcUrl);
  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': requestData.length
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log("Live RPC Response Received:");
        console.log(`Current On-Chain Balance (Wei): ${response.result || '0x0'}`);
        
        let ethBalance = "0";
        if (response.result && response.result !== "0x0") {
          ethBalance = (parseInt(response.result, 16) / 1e18).toString();
        }
        console.log(`Decoded Wallet Balance: ${ethBalance} ETH`);
      } catch (e) {
        console.error("Failed to parse RPC response:", data);
      }
    });
  });

  req.on('error', (error) => {
    console.error("Live network request error:", error);
  });

  req.write(requestData);
  req.end();
}

sendLiveTransaction();
