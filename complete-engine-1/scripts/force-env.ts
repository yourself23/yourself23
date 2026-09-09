import * as fs from "fs";

const targetKey = "0x073050f6a7dea5b9582fd766009ab40e1e1dc4afb89a3ec40042a425672e6188";
const targetAddress = "0x39C8f221541f44762D6E4f9Cf8E678BE2FFf02B9";

let envContent = "";
if (fs.existsSync(".env")) {
  const lines = fs.readFileSync(".env", "utf8").split(/\r?\n/);
  const filtered = lines.filter(line => 
    !line.startsWith("PRIVATE_KEY=") && 
    !line.startsWith("DEPLOYER_ADDRESS=") &&
    line.trim() !== ""
  );
  envContent = filtered.join("\n") + "\n";
}

envContent += `PRIVATE_KEY=${targetKey}\n`;
envContent += `DEPLOYER_ADDRESS=${targetAddress}\n`;

fs.writeFileSync(".env", envContent);
console.log("Forced clean .env rewrite completed.");
