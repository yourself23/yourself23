import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

const TRUST_REGISTRY = "0xZK_TRUST_99810a08f2120391028301928301a92019382103982a10c92019203920102a01";

async function executeAllocation() {
  console.log(`Connecting to registry: ${TRUST_REGISTRY}`);
  console.log("Ready to execute 10% contract allocation to wallet.");
}

executeAllocation().catch(console.error);
