"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ActiveMarkets } from "../../../components/ui/activeMarkets";
import { Action, Coin, RestorativeAction } from "../../../commonTypes";
import { CardDialog } from "../../../components/ui/cardDialog";
import { Icon } from "../../../components/ui/icons/index";
import { FunkyFontWrapper } from "../../../components/ui/funkyFontWrapper";
import { SupplyBorrowCard } from "../../../components/ui/supplyBorrowCard";
import Chart from "react-apexcharts";
import { ConnectionRequired } from "../../../components/ui/connectionRequired";

const coinData: Record<Coin, { name: string }> = {
  FTX: { name: "FTX" },
  ETH: { name: "Ethereum" },
  AVAX: { name: "Avalanche" },
};

global.document?.documentElement.style.setProperty("--gradient-step", "220px");

export default function MarketPage() {
  const pathname = usePathname();
  const lastSegmentStartIndex = pathname.lastIndexOf("/");
  const coin = pathname.substring(lastSegmentStartIndex + 1);

  useEffect(() => {
    global.document?.documentElement.style.setProperty(
      "--gradient-step",
      "220px",
    );
  }, []);

  const [dialogProps, setDialogProps] = useState<{
    action: Action | RestorativeAction;
    coin: Coin;
    amount?: number;
  } | null>(null);

  const handleAction = useCallback(
    (action: Action | RestorativeAction, coin: Coin, amount?: number) => {
      setDialogProps({ action, coin });
    },
    [],
  );
  const handleDialogOpenChange = useCallback((opened: boolean) => {
    if (!opened) {
      setDialogProps(null);
    }
  }, []);

  const IconComponent = Icon[coin as Coin] ?? null;

  return (
    <ConnectionRequired>
      <main className="flex flex-col flex-grow items-center justify-between pt-14 px-5 text-black backdrop-blur-sm sm:backdrop-blur-none">
        <CardDialog
          dialogProps={dialogProps}
          onOpenChange={handleDialogOpenChange}
        />
        <section className="flex flex-col sm:flex-row w-full gap-5">
          <div className="flex flex-row gap-5">
            <IconComponent width={95} height={95} />
            <FunkyFontWrapper className="text-3xl pt-2">
              {coinData[coin as Coin].name}
            </FunkyFontWrapper>
          </div>
          <div className="flex flex-grow justify-end text-end gap-10 ">
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold opacity-40">SUPPLY APY</div>
              <FunkyFontWrapper className="text-green-500 text-[28px]">
                28,90%
              </FunkyFontWrapper>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold opacity-40">BORROW APY</div>
              <FunkyFontWrapper className="text-orange-400 text-[28px]">
                18,90%
              </FunkyFontWrapper>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold opacity-40">
                POOL UTILIZATION
              </div>
              <FunkyFontWrapper className="text-slate-400 text-[28px]">
                97%
              </FunkyFontWrapper>
            </div>
          </div>
        </section>
        <section className="flex sm:flex-row w-full pt-6 gap-6 flex-col">
          <div className="p-6 flex flex-col grow ring-1 ring-[#00000014] bg-white relative">
            <FunkyFontWrapper className="text-2xl">
              Pool utilization ratio
            </FunkyFontWrapper>
            <Chart
              options={{
                chart: {
                  toolbar: { show: false },
                  zoom: { enabled: false },
                },
                xaxis: {
                  labels: { show: false },
                },

                tooltip: { enabled: false },
                dataLabels: { enabled: false },
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.7,
                    opacityTo: 0.1,
                    stops: [0, 100],
                  },
                },
                colors: ["#8AE850"],
                stroke: {
                  curve: "straight",
                  width: 1,
                },
                markers: {
                  size: 0,
                },
              }}
              series={[
                {
                  name: "Pool utilization",
                  data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
                },
              ]}
              height={192}
              type="area"
              width="100%"
            />
          </div>
          <SupplyBorrowCard noInfoRows defaultCoin={coin as Coin} />
        </section>
        <section className="flex flex-col mt-9 mb-14 w-full gap-14">
          <ActiveMarkets
            onAction={handleAction}
            title="More Markets"
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
        </section>
      </main>
    </ConnectionRequired>
  );
}
