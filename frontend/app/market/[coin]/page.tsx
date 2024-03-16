"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ActiveMarkets } from "../../../components/ui/activeMarkets";
import { Action, Coin, RestorativeAction } from "../../../commonTypes";
import { CardDialog } from "../../../components/ui/cardDialog";

export default function MarketPage() {
  const pathname = usePathname();
  const lastSegmentStartIndex = pathname.lastIndexOf("/");
  const coin = pathname.substring(lastSegmentStartIndex + 1);

  useEffect(() => {
    document.documentElement.style.setProperty("--gradient-step", "380px");
  }, []);

  const [dialogProps, setDialogProps] = useState<{
    action: Action | RestorativeAction;
    coin: Coin;
  } | null>(null);

  const handleAction = useCallback(
    (action: Action | RestorativeAction, coin: Coin) => {
      setDialogProps({ action, coin });
    },
    [],
  );
  const handleDialogOpenChange = useCallback((opened: boolean) => {
    if (!opened) {
      setDialogProps(null);
    }
  }, []);

  console.log("render");

  return (
    <main className="flex flex-col flex-grow items-center justify-between pt-6 md:pt-[100px] px-5 ">
      <CardDialog
        dialogProps={dialogProps}
        onOpenChange={handleDialogOpenChange}
      />
      <section className="flex flex-col mt-9 mb-14 w-full gap-14">
        <ActiveMarkets
          onAction={handleAction}
          title="More Markets"
          markets={[
            {
              coin: "ETH",
              name: "Etherium",
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
      </section>
    </main>
  );
}
