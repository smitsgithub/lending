"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Action, Coin, RestorativeAction } from "../../commonTypes";
import { Card } from "./card";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { CardContent } from "./lendTabContent";
import { usePathname } from "next/navigation";

export const SupplyBorrowCard = ({
  defaultAction,
  defaultCoin,
  totalAmount,
  noInfoRows,
}: {
  defaultAction?: Action | RestorativeAction;
  defaultCoin?: Coin;
  totalAmount?: number;
  noInfoRows?: boolean;
}) => {
  const [tab, setTab] = useState<Action | null>(
    defaultAction === "Repay" || defaultAction === "Withdraw"
      ? null
      : defaultAction ?? "Supply",
  );
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState<Coin>(defaultCoin ?? "ETH");

  const onAmountConfirm = useCallback(() => {
    if (!amount || !coin) return;
    setAmount("");
    alert(JSON.stringify({ tab, amount: Number.parseFloat(amount) }));
  }, [amount, coin, tab]);

  const path = usePathname();
  useEffect(() => {
    const afterHash = path.split("#")[1]?.toLocaleLowerCase();
    if (afterHash === "supply") {
      setTab("Supply");
    } else if (afterHash === "borrow") {
      setTab("Borrow");
    }
  }, [path]);

  const infoRows = useMemo(
    () =>
      noInfoRows
        ? []
        : [
            {
              title: tab === "Supply" ? "SUPPLY APY" : "BORROW APY",
              value: "28%",
            },
            {
              title: tab === "Supply" ? "SUPPLY BALANCE" : "BORROW BALANCE",
              value: "3 ETH",
            },
            {
              title:
                tab === "Supply" ? "COLLATERAL FACTOR" : "COLLATERAL FACTOR",
              value: "70.0%",
            },
          ],
    [tab, noInfoRows],
  );

  if (tab) {
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
            totalAmount={totalAmount}
            onCoinChange={setCoin}
            onSubmit={onAmountConfirm}
            infoRows={infoRows}
          />
        </Tabs>
      </Card>
    );
  } else if (defaultAction && defaultCoin) {
    return (
      <Card className="p-6">
        <CardContent
          action={defaultAction}
          amount={amount}
          totalAmount={totalAmount}
          onAmountChange={setAmount}
          coin={coin}
          onSubmit={onAmountConfirm}
        />
      </Card>
    );
  }
};
