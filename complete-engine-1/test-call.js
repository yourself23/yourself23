const https = require('https');

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

const req = https.request({
  hostname: "mainnet.base.org",
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload)
  }
}, (res) => {
  let responseData = "";
  res.on("data", chunk => responseData += chunk);
  res.on("end", () => console.log("RPC_RESULT:", responseData));
});

req.on("error", err => console.error("ERROR:", err.message));
req.write(payload);
req.end();
