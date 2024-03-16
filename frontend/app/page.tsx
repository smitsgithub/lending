"use client";

import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useAccount, useNetwork } from "wagmi";
import { useCallback, useMemo, useState } from "react";
import {
  useAuthenticateConnectedUser,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { Coin } from "../commonTypes";
import { LendTabContent } from "../components/ui/lendTabContent";

export default function Home() {
  const [tab, setTab] = useState("lend");
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState<Coin>("ETH");

  const onAmountConfirm = useCallback(() => {
    if (!amount || !coin) return;
    setAmount("");
    alert(JSON.stringify({ tab, amount: Number.parseFloat(amount) }));
  }, [amount, coin, tab]);

  // const { address, isConnected } = useAccount();
  // const { primaryWallet, user } = useDynamicContext();
  // const { authenticateUser, isAuthenticating } = useAuthenticateConnectedUser();
  // const { chain } = useNetwork();
  // console.log({
  //   address,
  //   isConnected,
  //   chain,
  //   primaryWallet,
  //   user,
  //   authenticateUser,
  //   isAuthenticating,
  // });

  const infoRows = useMemo(
    () => [
      { title: "SUPPLY APY", value: "28%" },
      { title: "SUPPLY BALANCE", value: "3 ETH" },
      { title: "COLLATERAL FACTOR", value: "70.0%" },
    ],
    [],
  );

  return (
    <main className="flex flex-col flex-grow items-center justify-between pt-6 md:pt-[100px] px-5">
      <Card className="max-w-[580px] w-full p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lend">Lend</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
          </TabsList>
          <TabsContent value="lend" className="justify-stretch">
            <LendTabContent
              amount={amount}
              onAmountChange={setAmount}
              coin={coin}
              onCoinChange={setCoin}
              onSubmit={onAmountConfirm}
              infoRows={infoRows}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </main>
  );
}
