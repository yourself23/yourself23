"use client";

import { useState } from "react";

export function useSilentWallet() {
  const [isConnected, setIsConnected] = useState(true);
  const [address, setAddress] = useState("0xVerifiedBackgroundSigner");

  const connectPersonal = () => {
    setIsConnected(true);
  };

  return { isConnected, address, connectPersonal };
}
