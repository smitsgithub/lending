import { FunkyFontWrapper } from "./funkyFontWrapper";
import { Action, Coin, Position, RestorativeAction } from "../../commonTypes";
import { FirstColumn } from "./firstColumn";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./button";
import { MiniTable } from "./miniTable";
import { Hidable } from "./hidable";

export const YourPositions = ({
  supplying,
  borrowing,
  netValue,
  onAction,
}: {
  supplying: { positions: Position[]; total: number };
  borrowing: { positions: Position[]; total: number };
  netValue: number;
  onAction: (
    action: Action | RestorativeAction,
    position: Coin,
    amount?: number,
  ) => void;
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <FunkyFontWrapper className="text-[28px]">
          Your Positions
        </FunkyFontWrapper>
        <FunkyFontWrapper className="text-xl">
          Net: <Hidable>{netValue}</Hidable>
        </FunkyFontWrapper>
      </div>
      <section className="flex flex-col sm:flex-row gap-6 sm:items-start">
        <div className="p-5 flex flex-col grow ring-1 ring-[#00000014] bg-white">
          <div className="flex flex-row justify-between">
            <FunkyFontWrapper className="text-xl mb-3">
              Supplying
            </FunkyFontWrapper>
            <div className="flex flex-row gap-1 items-center">
              <span className="text-xs opacity-40">Total Supply</span>
              <Hidable>
                <span className="text-sm text-slate-600">
                  ${supplying.total}
                </span>
              </Hidable>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {supplying.positions.map((position) => (
              <PositionCard
                onAction={onAction}
                key={position.coin}
                position={position}
                type="Supply"
              />
            ))}
          </div>
        </div>
        <div className="p-5 flex flex-col grow ring-1 ring-[#00000014] bg-white">
          <div className="flex flex-row justify-between">
            <FunkyFontWrapper className="text-xl mb-3">
              Borrowing
            </FunkyFontWrapper>
            <div className="flex flex-row gap-1 items-center">
              <span className="text-xs opacity-40">Total Borrow</span>
              <Hidable>
                <span className="text-sm text-slate-600">
                  ${supplying.total}
                </span>
              </Hidable>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {borrowing.positions.map((position) => (
              <PositionCard
                onAction={onAction}
                key={position.coin}
                position={position}
                type="Borrow"
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export const PositionCard = ({
  position,
  type,
  onAction,
}: {
  position: Position;
  type: Action;
  onAction: (
    action: Action | RestorativeAction,
    position: Coin,
    amount?: number,
  ) => void;
}) => {
  const data = useMemo(
    () => ({
      label: "APY",
      value: `${position.apy.toFixed(2)}%`,
      valueClassName: type === "Borrow" ? "text-yellow-500" : "text-green-500",
    }),
    [position.apy, type],
  );
  return (
    <div className="flex flex-row justify-between ring-1 p-5 ring-[#00000014]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <FirstColumn
              coin={position.coin}
              name={position.name}
              data={data}
            />
            <div className="flex flex-col justify-between text-right">
              <div className="text-xs font-semibold opacity-40">
                {type === "Borrow" ? "Borrowing" : "Supplying"}
              </div>
              <div className="text-sm font-semibold">
                <Hidable>
                  {position.amount} {position.coin}
                </Hidable>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <MiniTable
              infoRows={[
                { title: "USD Value", value: `$3,600` },
                { title: "Current price", value: `$3,600` },
                {
                  title: "Liquidation price",
                  value: "$400",
                },
              ]}
            />
            <div className="flex flex-row gap-4 mt-4">
              <Button
                className="grow"
                variant="secondary"
                onClick={() =>
                  onAction(
                    type === "Borrow" ? "Repay" : "Withdraw",
                    position.coin,
                    position.amount,
                  )
                }
              >
                {type === "Borrow" ? "Repay" : "Withdraw"}
              </Button>
              <Button
                className="grow"
                variant="secondary"
                onClick={() => onAction(type, position.coin)}
              >
                {type === "Borrow" ? "Borrow More" : "Supply More"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
