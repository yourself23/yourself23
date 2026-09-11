import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { message, signature, expectedAddress } = body;

        if (!message || !signature || !expectedAddress) {
            return NextResponse.json({ success: false, error: "Missing required tracking parameters" }, { status: 400 });
        }

        // Verify cryptographic signature safely off-chain using standard EIP-1193 structures
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        const isValid = recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();

        return NextResponse.json({
            success: true,
            verified: isValid,
            identity: recoveredAddress
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Pipeline processing exception occurred inside verify gateway" },
            { status: 500 }
        );
    }
}
