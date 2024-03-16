"use client";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Logo } from "../components/ui/logo/logo";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { setShowAuthFlow, isAuthenticated } = useDynamicContext();
  const onConnect = () => setShowAuthFlow(true);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      className="flex flex-col justify-between mt-12 mx-5 sm:flex-row gap-6 items-center"
      suppressHydrationWarning
    >
      <Logo />
      {isAuthenticated && isClient ? (
        <DynamicWidget />
      ) : (
        <Button onClick={onConnect}>Connect Wallet</Button>
      )}
    </section>
  );
}
