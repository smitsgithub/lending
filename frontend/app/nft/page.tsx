"use client";
import { SupplyBorrowCard } from "../../components/ui/supplyBorrowCard";
import { AccountInfo } from "../../components/ui/accountInfo";
import { ActiveMarkets } from "../../components/ui/activeMarkets";
import { YourPositions } from "../../components/ui/yourPositions";
import { useEffect } from "react";

export default function NFT() {
  useEffect(() => {
    document.documentElement.style.setProperty("--gradient-step", "380px");
  }, []);
  return (
    <main className="flex flex-col flex-grow items-center justify-between pt-6 md:pt-[100px] px-5 ">
      <section className="max-w-[580px] w-full flex flex-col gap-6">
        <SupplyBorrowCard />
        <AccountInfo />
      </section>
      <section className="flex flex-col mt-9 mb-14 w-full gap-14">
        <ActiveMarkets
          onAction={() => {}} // FIXME:
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
        <YourPositions
          netValue={1000}
          supplying={[
            {
              coin: "ETH",
              name: "Etherium",
              amount: 1,
              apy: 28.04,
            },
            {
              coin: "AVAX",
              name: "Avalanche",
              amount: 450,
              apy: 13.04,
            },
          ]}
          borrowing={[
            {
              coin: "FTX",
              name: "FTX",
              amount: 2553,
              apy: 13.04,
            },
          ]}
        />
      </section>
    </main>
  );
}
