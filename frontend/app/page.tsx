"use client";
import { LendBorrowCard } from "../components/ui/lendBorrowCard";
import { AccountInfo } from "../components/ui/accountInfo";
import { ActiveMarkets } from "../components/ui/activeMarkets";
import { YourStake } from "../components/ui/yourStake";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow items-center justify-between pt-6 md:pt-[100px] px-5 ">
      <section className="max-w-[580px] w-full flex flex-col gap-6">
        <LendBorrowCard />
        <AccountInfo />
      </section>
      <section className="mt-9 mb-[204px] w-full">
        <ActiveMarkets
          onSupply={() => {}}
          onBorrow={() => {}}
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
        <YourStake />
      </section>
    </main>
  );
}
