"use client";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Logo } from "./logo";
import { Button } from "./button";
import { useEffect, useState } from "react";

export function Header() {
  const { setShowAuthFlow, isAuthenticated } = useDynamicContext();
  const onConnect = () => setShowAuthFlow(true);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="flex flex-col justify-between mt-12 mx-5 sm:flex-row gap-6 items-center">
      <Logo />
      {isAuthenticated && isClient ? (
        <DynamicWidget />
      ) : (
        <Button onClick={onConnect}>Connect Wallet</Button>
      )}
    </header>
  );
}
