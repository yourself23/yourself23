const https = require('https');

const rpcUrl = process.env.RPC_URL || process.env.BASE_RPC_URL || "https://mainnet.base.org";
const url = new URL(rpcUrl);

const payload = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_call",
  params: [
    {
      to: "0xc7f0e17931b253f659ad8d36bf39ee",
      data: "0xa9059cbb000000000000000000000000a34bd5fcf75718104e1e0bdd3c6a22a071a1c9c70000000000000000000000000000000000000000000000001ad1bc400"
    },
    "latest"
  ],
  id: 1
});

const client = url.protocol === 'http:' ? require('http') : https;

const req = client.request({
  hostname: url.hostname,
  port: url.port || (url.protocol === 'http:' ? 80 : 443),
  path: url.pathname + url.search,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload)
  }
}, (res) => {
  let output = "";
  res.on("data", chunk => output += chunk);
  res.on("end", () => {
    process.stdout.write(output + "\n");
  });
});

req.write(payload);
req.end();
