import { FunkyFontWrapper } from "./funkyFontWrapper";
import { Action, Position } from "../../commonTypes";
import { FirstColumn } from "./firstColumn";
import { useMemo } from "react";

export const YourPositions = ({
  supplying,
  borrowing,
  netValue,
}: {
  supplying: Position[];
  borrowing: Position[];
  netValue: number;
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <FunkyFontWrapper className="text-[28px]">
          Your Positions
        </FunkyFontWrapper>
        <FunkyFontWrapper className="text-xl">
          Net: ${netValue}
        </FunkyFontWrapper>
      </div>
      <section className="flex flex-col sm:flex-row gap-6 sm:items-start">
        <div className="p-5 flex flex-col grow ring-1 ring-[#00000014] bg-white">
          <FunkyFontWrapper className="text-xl mb-3">
            Supplying
          </FunkyFontWrapper>
          <div className="flex flex-col gap-2">
            {supplying.map((position) => (
              <PositionCard
                key={position.coin}
                position={position}
                type="Borrow"
              />
            ))}
          </div>
        </div>
        <div className="p-5 flex flex-col grow ring-1 ring-[#00000014] bg-white">
          <FunkyFontWrapper className="text-xl mb-3">
            Borrowing
          </FunkyFontWrapper>
          <div className="flex flex-col gap-2">
            {borrowing.map((position) => (
              <PositionCard
                key={position.coin}
                position={position}
                type="Supply"
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
}: {
  position: Position;
  type: Action;
}) => {
  const data = useMemo(
    () => ({
      label: "APY",
      value: `${position.apy.toFixed(2)}%`,
      valueClassName: type === "Borrow" ? "text-yellow-500" : "text-green-500", // FIXME:
    }),
    [position.apy, type],
  );
  return (
    <div className="flex flex-row justify-between ring-1 p-5 ring-[#00000014]">
      <FirstColumn coin={position.coin} name={position.name} data={data} />
      <div className="flex flex-col justify-between text-right">
        <div className="text-sm font-semibold">
          {position.amount} {position.coin}
        </div>
        <div className="text-xs font-semibold opacity-40">
          {type === "Borrow" ? "Borrowing" : "Supplying"}
        </div>
      </div>
    </div>
  );
};
