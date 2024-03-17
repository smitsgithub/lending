"use client";
import { SupplyBorrowCard } from "../components/ui/supplyBorrowCard";
import { AccountInfo } from "../components/ui/accountInfo";
import { ActiveMarkets } from "../components/ui/activeMarkets";
import { YourPositions } from "../components/ui/yourPositions";
import { useCallback, useEffect, useState } from "react";
import { CardDialog } from "../components/ui/cardDialog";
import { Action, Coin, RestorativeAction } from "../commonTypes";
import { ConnectionRequired } from "../components/ui/connectionRequired";

global.document?.documentElement.style.setProperty("--gradient-step", "580px");
export default function Home() {
  useEffect(() => {
    global.document?.documentElement.style.setProperty(
      "--gradient-step",
      "580px",
    );
  }, []);
  const [dialogProps, setDialogProps] = useState<{
    action: Action | RestorativeAction;
    coin: Coin;
    amount?: number;
  } | null>(null);

  const handleAction = useCallback(
    (action: Action | RestorativeAction, coin: Coin, amount?: number) => {
      console.log({ action, coin });
      setDialogProps({ action, coin, amount });
    },
    [],
  );
  const handleDialogOpenChange = useCallback((opened: boolean) => {
    if (!opened) {
      setDialogProps(null);
    }
  }, []);

  return (
    <ConnectionRequired>
      <main className="flex flex-col flex-grow items-center justify-between pt-6 md:pt-[100px] px-5 backdrop-blur-sm sm:backdrop-blur-none">
        <CardDialog
          dialogProps={dialogProps}
          onOpenChange={handleDialogOpenChange}
        />
        <section className="max-w-[580px] w-full flex flex-col gap-6">
          <SupplyBorrowCard />
          <AccountInfo />
        </section>
        <section className="flex flex-col mt-9 mb-14 w-full gap-14">
          <ActiveMarkets
            onAction={handleAction}
            markets={[
              {
                coin: "ETH",
                name: "Ethereum",
                poolUtilization: 97,
                supplyAPY: 28.5,
                borrowAPY: 18.5,
              },
              {
                coin: "AVAX",
                name: "Avalanche",
                poolUtilization: 97,
                supplyAPY: 13.4,
                borrowAPY: 18.5,
              },
            ]}
          />
          <YourPositions
            netValue={1000}
            onAction={handleAction}
            supplying={{
              total: 1000,
              positions: [
                {
                  coin: "ETH",
                  name: "Ethereum",
                  amount: 1,
                  apy: 28.04,
                },
                {
                  coin: "AVAX",
                  name: "Avalanche",
                  amount: 450,
                  apy: 13.04,
                },
              ],
            }}
            borrowing={{
              total: 1000,
              positions: [
                {
                  coin: "FTX",
                  name: "FTX",
                  amount: 2553,
                  apy: 13.04,
                },
              ],
            }}
          />
        </section>
      </main>
    </ConnectionRequired>
  );
}
