"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Action,
  ProperCoin,
  RestorativeAction,
  tokens,
} from "../../commonTypes";
import { Card } from "./card";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { CardContent } from "./lendTabContent";
import { usePathname } from "next/navigation";
import { BalanceContext } from "./balanceProvider";
import { UserContext } from "./userContextProvider";

export const SupplyBorrowCard = ({
  defaultAction,
  defaultCoin,
  totalAmount,
  noInfoRows,
  onDone,
}: {
  defaultAction?: Action | RestorativeAction;
  defaultCoin?: ProperCoin;
  totalAmount?: string;
  noInfoRows?: boolean;
  onDone?: () => void;
}) => {
  const [tab, setTab] = useState<Action | null>(
    defaultAction === "Repay" || defaultAction === "Withdraw"
      ? null
      : defaultAction ?? "Supply",
  );
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState<ProperCoin>(defaultCoin ?? "FHE");

  const { balance } = useContext(BalanceContext);
  const {} = useContext(UserContext);

  const onAmountConfirm = useCallback(() => {
    if (!amount || !coin) return;
    setAmount("");
    const action = tab;
    const numAmount = Number.parseFloat(amount);
    console.log({ action, numAmount, coin });
    onDone?.();
  }, [amount, coin, onDone, tab]);

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
            tab === "Supply"
              ? {
                  title: "SUPPLY APY",
                  value: `${tokens[coin].tempHardcoded.supplyAPY}%`,
                }
              : {
                  title: "BORROW APY",
                  value: `${tokens[coin].tempHardcoded.borrowAPY}%`,
                },
            tab === "Supply"
              ? {
                  title: "SUPPLY BALANCE",
                  value: balance
                    ? balance[coin].liquidityBalance.toLocaleString() +
                      ` ${coin}`
                    : "-",
                }
              : {
                  title: "BORROW BALANCE",
                  value: balance
                    ? balance[coin].borrowBalance.toLocaleString() + ` ${coin}`
                    : "-",
                },
            {
              title: "COLLATERAL FACTOR",
              value: "70.0%",
            },
          ],
    [noInfoRows, tab, coin, balance],
  );

  let content = null;
  if (tab) {
    content = (
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
    return (content = (
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
    ));
  }

  return <>{content}</>;
};
