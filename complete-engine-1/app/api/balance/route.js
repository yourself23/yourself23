import { NextResponse } from "next/server";
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
}
