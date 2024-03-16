"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Action, Coin, RestorativeAction } from "../../commonTypes";
import { Card } from "./card";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { CardContent } from "./lendTabContent";

export const SupplyBorrowCard = ({
  defaultAction,
  defaultCoin,
}: {
  defaultAction?: Action | RestorativeAction;
  defaultCoin?: Coin;
}) => {
  const [tab, setTab] = useState<Action>(
    defaultAction === "Borrow" || defaultAction === "Supply" // FIXME:
      ? defaultAction
      : "Supply",
  );
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState<Coin>(defaultCoin ?? "ETH");

  const onAmountConfirm = useCallback(() => {
    if (!amount || !coin) return;
    setAmount("");
    alert(JSON.stringify({ tab, amount: Number.parseFloat(amount) }));
  }, [amount, coin, tab]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#lend") {
        setTab("Supply");
      } else if (window.location.hash === "#borrow") {
        setTab("Borrow");
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
      { title: tab === "Supply" ? "SUPPLY APY" : "BORROW APY", value: "28%" },
      {
        title: tab === "Supply" ? "SUPPLY BALANCE" : "BORROW BALANCE",
        value: "3 ETH",
      },
      {
        title: tab === "Supply" ? "COLLATERAL FACTOR" : "COLLATERAL FACTOR",
        value: "70.0%",
      },
    ],
    [tab],
  );

  return (
    <Card className="p-6">
      <Tabs value={tab} onValueChange={setTab as (action: string) => void}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Supply">Supply</TabsTrigger>
          <TabsTrigger value="Borrow">Borrow</TabsTrigger>
        </TabsList>
        <CardContent
          action={tab}
          amount={amount}
          onAmountChange={setAmount}
          coin={coin}
          onCoinChange={setCoin}
          onSubmit={onAmountConfirm}
          infoRows={infoRows}
        />
      </Tabs>
    </Card>
  );
};
