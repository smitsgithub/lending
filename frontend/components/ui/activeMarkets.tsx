"use client";
import { FC } from "react";
import { Action, Coin, Market } from "../../commonTypes";
import { FunkyFontWrapper } from "./funkyFontWrapper";
import { MarketTableRow } from "./marketTableRow";

export const ActiveMarkets: FC<{
  markets: Market[];
  title?: string;
  onAction: (action: Action, coin: Coin) => void;
}> = ({ markets, title, onAction }) => {
  return (
    <section className="flex flex-col gap-4">
      <FunkyFontWrapper className="text-[28px] pb-1">
        {title ?? "Active Markets"}
      </FunkyFontWrapper>
      {markets.map((m) => (
        <MarketTableRow {...m} key={m.name} onAction={onAction} />
      ))}
    </section>
  );
};
