import { UnifiedPoolDashboard } from "../src/components/UnifiedPoolDashboard";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <UnifiedPoolDashboard />
      </div>
    </main>
  );
}
