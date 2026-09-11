const https = require('https');
async function sendDirectPayload() {
  const rpcUrl = "https://mainnet.base.org";
  const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
  console.log("--- WILLSTONE NEXUS: DIRECT BASE MAINNET PUSH ---");
  const postData = JSON.stringify({
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
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log("Node Response Status:", res.statusCode);
      console.log("Wallet State Result:", data);
    });
  });
  req.on('error', e => console.error(`Request Error: ${e.message}`));
  req.write(postData);
  req.end();
}
sendDirectPayload();
