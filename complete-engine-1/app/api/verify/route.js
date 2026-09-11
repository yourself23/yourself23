import { NextResponse } from "next/next-server";
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
}
