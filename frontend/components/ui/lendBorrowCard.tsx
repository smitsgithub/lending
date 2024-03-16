"use client";
import { useCallback, useMemo, useState } from "react";
import { Coin } from "../../commonTypes";
import { Card } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { LendTabContent } from "./lendTabContent";

export const LendBorrowCard = () => {
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
    <Card className="p-6">
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
  );
};
