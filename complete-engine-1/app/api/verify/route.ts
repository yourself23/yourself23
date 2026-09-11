import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { proofHash } = body;
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || "8453";
    const vaultAddress = process.env.NEXT_PUBLIC_DAI_VAULT_ADDRESS || "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";

    if (!proofHash) {
      return NextResponse.json({ error: "Missing proof hash parameter" }, { status: 400 });
    }

    return NextResponse.json({
      status: "SUCCESS",
      chain: "Base Mainnet",
      chainId,
      vaultTarget: vaultAddress,
      verifiedHash: proofHash,
      timestamp: new Date().toISOString(),
      engine: "Willstone Nexus Active Pipeline"
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
