import VaultInteraction from "@/components/VaultInteraction";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Standalone DAI Vault</h1>
        <p className="text-sm text-zinc-400 mt-2">Interact with your deployed Base Mainnet vault directly.</p>
      </div>
      <VaultInteraction />
    </main>
  );
}
