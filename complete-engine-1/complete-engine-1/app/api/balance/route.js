import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Live production RPC configurations
const PROVIDERS = {
    arbitrum: 'https://alphametrics.io',
    base: 'https://base.org'
};

const OPERATOR_WALLET = '0x39c8f221541f44762d6e4f9cf8e678be2fff02b9';

export async function GET() {
    try {
        const arbProvider = new ethers.providers.JsonRpcProvider(PROVIDERS.arbitrum);
        const baseProvider = new ethers.providers.JsonRpcProvider(PROVIDERS.base);

        // Fetch direct real-world metrics from live active chains
        const [arbBalance, baseBalance] = await Promise.all([
            arbProvider.getBalance(OPERATOR_WALLET),
            baseProvider.getBalance(OPERATOR_WALLET)
        ]);

        // Returns clean, unified values directly back to your frontend dashboard metrics
        return NextResponse.json({
            success: true,
            operator: OPERATOR_WALLET,
            metrics: {
                arbitrum: ethers.utils.formatEther(arbBalance),
                base: ethers.utils.formatEther(baseBalance)
            }
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to pull live pipeline balance state tracking values" },
            { status: 500 }
        );
    }
}
