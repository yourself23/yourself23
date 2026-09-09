import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const targetKey = "0x073050f6a7dea5b9582fd766009ab40e1e1dc4afb89a3ec40042a425672e6188";
const targetAddress = "0x39C8f221541f44762D6E4f9Cf8E678BE2FFf02B9";

let envContent = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";

// Filter out old placeholder or duplicate keys
const lines = envContent.split(/\r?\n/).filter(line => {
  return !line.startsWith("PRIVATE_KEY=") && !line.startsWith("DEPLOYER_ADDRESS=");
});

lines.push(`PRIVATE_KEY=${targetKey}`);
lines.push(`DEPLOYER_ADDRESS=${targetAddress}`);

fs.writeFileSync(".env", lines.join("\n") + "\n");
console.log(".env file updated cleanly.");
