"use client";
import { FC } from "react";
import { Coin, Market } from "../../commonTypes";
import { FunkyFontWrapper } from "./funkyFontWrapper";
import { Icon } from "./icons";
import { Button } from "./button";
import { VerticalDivider } from "./verticalDivider";

export const ActiveMarkets: FC<{
  markets: Market[];
  onSupply: (coin: Coin) => void;
  onBorrow: (coin: Coin) => void;
}> = ({ markets, onSupply, onBorrow }) => {
  return (
    <section className="flex flex-col gap-4">
      <FunkyFontWrapper className="text-[28px] pb-1">
        Active Markets
      </FunkyFontWrapper>
      {markets.map(({ coin, name, poolUtilization, supplyAPY, borrowAPY }) => {
        const CoinIcon = Icon[coin];
        return (
          <div
            key={coin}
            className="flex flex-col sm:flex-row ring-1 ring-[#00000014] p-5 gap-2 sm:gap-0"
          >
            <div className="flex flex-row flex-grow">
              <CoinIcon className="mr-3" />
              <div className="flex flex-col justify-between">
                <FunkyFontWrapper className="text-xl leading-none">
                  {name}
                </FunkyFontWrapper>
                <div className="text-xs opacity-40 font-semibold">
                  Pool Utilization: {Math.round(poolUtilization)}%
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-between">
                <div className="text-xs opacity-40 font-semibold">
                  Supply APY
                </div>
                <div className="text-sm font-semibold text-green-500">
                  {supplyAPY.toFixed(2)}%
                </div>
              </div>
              <VerticalDivider className="mx-8" />
              <div className="flex flex-col justify-between">
                <div className="text-xs opacity-40 font-semibold">
                  Borrow APY
                </div>
                <div className="text-sm font-semibold text-yellow-500">
                  {borrowAPY.toFixed(2)}%
                </div>
              </div>
            </div>
            <Button
              className="sm:ml-6"
              variant="secondary"
              onClick={() => onSupply(coin)}
            >
              Supply
            </Button>
            <Button
              className="sm:ml-4"
              variant="secondary"
              onClick={() => onBorrow(coin)}
            >
              Borrow
            </Button>
          </div>
        );
      })}
    </section>
  );
};
