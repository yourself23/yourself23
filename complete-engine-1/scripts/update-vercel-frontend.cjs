const fs = require('fs');
const path = require('path');

// Target deployed contract address
const contractAddress = "0xe14225299233563d3deaaFFAaafE0CD7CC719662";
const configPaths = [
  "src/config/contracts.ts",
  "src/constants/contracts.ts",
  "lib/contracts.ts",
  "utils/contracts.ts"
];

let updated = false;

for (const p of configPaths) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/0x[a-fA-F0-9]{40}/g, contractAddress);
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Updated contract address in ${p}`);
    updated = true;
  }
}

if (!updated) {
  console.log("No standard config file found automatically. Creating lib/contracts.ts...");
  if (!fs.existsSync("lib")) fs.mkdirSync("lib");
  fs.writeFileSync("lib/contracts.ts", `export const STANDALONE_DAI_VAULT_ADDRESS = "${contractAddress}";\n`);
}
