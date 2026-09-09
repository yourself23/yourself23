import type { Metadata } from "next";
import "../src/app/globals.css";

export const metadata: Metadata = {
  title: "Standalone DAI Vault",
  description: "Interact with your deployed Base Mainnet vault directly.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-black">
      <body>{children}</body>
    </html>
  );
}
