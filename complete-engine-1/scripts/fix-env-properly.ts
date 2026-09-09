import * as fs from "fs";

const realKey = "0x073050f6a7dea5b9582fd766009ab40e1e1dc4afb89a3ec40042a425672e6188";
const realAddress = "0x39C8f221541f44762D6E4f9Cf8E678BE2FFf02B9";

let content = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";

// Remove any broken/placeholder lines entirely
const cleanLines = content.split(/\r?\n/).filter(line => {
  const trimmed = line.trim();
  return (
    trimmed !== "" &&
    !trimmed.includes("your_wallet_private_key_here") &&
    !trimmed.startsWith("PRIVATE_KEY=") &&
    !trimmed.startsWith("DEPLOYER_ADDRESS=")
  );
});

cleanLines.push(`PRIVATE_KEY=${realKey}`);
cleanLines.push(`DEPLOYER_ADDRESS=${realAddress}`);

fs.writeFileSync(".env", cleanLines.join("\n") + "\n");
console.log("Cleaned and rewritten .env successfully.");
