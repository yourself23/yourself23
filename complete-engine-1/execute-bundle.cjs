const https = require('https');

async function main() {
  const endpoint = "https://api.developer.coinbase.com/rpc/v1/base/uJKNXHF2a37jc8szuR27rmaUou6CvG4u";
  const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
  const apiKeyName = "363024d1-8932-49c8-87ac-47dd2097d0bb";
  const apiSecret = "xylvviPDmXE7RrDqE3oIXlK8IdxdUoEHkVyx9Fj/YG/bMnOPcH1etaWdWL7IoOw9eboG6uETpnr7F/+QCOaybw==";

  console.log("--- DISPATCHING CLEANED USER OPERATION ---");

  const postData = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_sendUserOperation",
    params: [
      {
        sender: destination,
        nonce: "0x1",
        callData: "0x",
        callGasLimit: "0x30d40",
        verificationGasLimit: "0x30d40",
        preVerificationGas: "0x5208",
        maxFeePerGas: "0x3b9aca00",
        maxPriorityFeePerGas: "0x3b9aca00",
        signature: "0x"
      },
      "0x2105"
    ],
    id: 1
  });

  const authHeader = 'Basic ' + Buffer.from(`${apiKeyName}:${apiSecret}`).toString('base64');
  const url = new URL(endpoint);

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log("Response Status:", res.statusCode);
      console.log("Response Body:", data);
    });
  });

  req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

main();
