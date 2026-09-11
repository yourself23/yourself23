const https = require('https');
async function testPaymasterFixed() {
  const endpoint = "https://api.developer.coinbase.com/rpc/v1/base/uJKNXHF2a37jc8szuR27rmaUou6CvG4u";
  const destination = "0xa34bd5fcf75718104e1e0bdd3c6a22a071a1c9c7";
  console.log("--- QUERYING PAYMASTER WITH PROPER ERC-7677 CONTEXT ---");
  const postData = JSON.stringify({
    jsonrpc: "2.0",
    method: "pm_getPaymasterStubData",
    params: [
      {
        sender: destination,
        nonce: "0x0",
        initCode: "0x",
        callData: "0x",
        callGasLimit: "0x5208",
        verificationGasLimit: "0x0186a0",
        preVerificationGas: "0x5208",
        maxFeePerGas: "0x3b9aca00",
        maxPriorityFeePerGas: "0x3b9aca00"
      },
      "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      "0x2105",
      { paymasterServiceUrl: endpoint }
    ],
    id: 1
  });
  const url = new URL(endpoint);
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
    res.on('end', () => console.log("Response:", data));
  });
  req.on('error', e => console.error(`Error: ${e.message}`));
  req.write(postData);
  req.end();
}
testPaymasterFixed();
