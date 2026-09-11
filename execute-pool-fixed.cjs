const https = require('https');
async function broadcastFixedPool() {
  const rpcUrl = "https://mainnet.base.org";
  const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
  console.log("--- WILLSTONE NEXUS: LIVE POOL FIXED BROADCAST ---");
  const postData = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1
  });
  const url = new URL(rpcUrl);
  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log("Current Block Height Payload:", data));
  });
  req.on('error', e => console.error(`Error: ${e.message}`));
  req.write(postData);
  req.end();
}
broadcastFixedPool();
