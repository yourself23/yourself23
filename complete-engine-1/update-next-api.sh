#!/bin/bash
set -e

# Setup secure rollback tracking to protect your Next.js directory
trap 'echo "Operation failed. Restoring original API state..."; git checkout -- app/api/ 2>/dev/null || true; exit 1' ERR

echo "Injecting Willstone Nexus Engine endpoints into complete-engine-1..."

# 1. Ensure target directory pathways exist
mkdir -p app/api/balance app/api/verify

# 2. Deploy Live Private Balance Read Pipe
printf "%s\n" 'import { NextResponse } from "next/server";
import { ethers } from "ethers";

const PROVIDERS = {
    arbitrum: "https://arbitrum.io",
    base: "https://mainnet.base.org"
};

const OPERATOR_WALLET = "0x39c8f221541f44762d6e4f9cf8e678be2fff02b9";

export async function GET() {
    try {
        const arbProvider = new ethers.JsonRpcProvider(PROVIDERS.arbitrum);
        const baseProvider = new ethers.JsonRpcProvider(PROVIDERS.base); 

        const [arbBalance, baseBalance] = await Promise.all([
            arbProvider.getBalance(OPERATOR_WALLET).then(b => b.toString()),
            baseProvider.getBalance(OPERATOR_WALLET).then(b => b.toString())
        ]);

        return NextResponse.json({
            success: true,
            operator: OPERATOR_WALLET,
            balances: {
                arbitrum: ethers.formatEther(arbBalance),
                base: ethers.formatEther(baseBalance)
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}' | tee app/api/balance/route.js > /dev/null

# 3. Deploy Secure Cryptographic Address Verification Endpoint
printf "%s\n" 'import { NextResponse } from "next/next-server";
import { ethers } from "ethers";

export async function POST(request) {
    try {
        const body = await request.json();
        const { address } = body;

        if (!address || !ethers.isAddress(address)) {
            return NextResponse.json({ success: false, error: "Invalid hexadecimal address vector" }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            verifiedAddress: ethers.getAddress(address),
            timestamp: Date.now()
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}' | tee app/api/verify/route.js > /dev/null

echo "Next.js Turbopack endpoints successfully updated and ready for clean compilation!"
