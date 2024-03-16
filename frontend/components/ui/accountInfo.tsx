import { cn } from "../../lib/utils";
import { CircularProgress } from "./circularProgress";
import { FunkyFontWrapper } from "./funkyFontWrapper";
import { Icon } from "./icons";
import { VerticalDivider } from "./verticalDivider";

export const AccountInfo = () => {
  const items = [
    { title: "YOU’RE SUPPLYING", value: "$2,900", coins: ["ETH", "AVAX"] },
    {
      title: "YOU’RE BORROWING",
      value: "$1,900",
      coins: ["ETH", "FTX"],
    },
  ] as const;

  return (
    <section className="flex justify-between w-full relative">
      {items.map((i) => {
        const coins = i.coins.slice(0, 3).map((c, i) => {
          const CoinIcon = Icon[c];
          return (
            <CoinIcon
              style={{ marginLeft: i * -4.4 }}
              width={16}
              height={16}
              key={c}
            />
          );
        });
        return (
          <AccountInfoItem
            key={i.title}
            title={i.title}
            value={
              <>
                <span className="pr-2">{i.value}</span>
                {coins}
              </>
            }
          />
        );
      })}
      <VerticalDivider />
      <AccountInfoItem
        title="ACCOUNT HEALTH"
        floatRight
        value={
          <>
            <span className="pr-2 text-green-500">47%</span>
            <CircularProgress percent={47} width={21} height={21} />
          </>
        }
      />
    </section>
  );
};

const AccountInfoItem = ({
  title,
  value,
  floatRight,
}: {
  title: string;
  value: JSX.Element;
  floatRight?: boolean;
}) => {
  return (
    <div>
      <div className="text-xs opacity-40">{title}</div>
      <FunkyFontWrapper
        className={cn(
          "text-[28px] flex flex-row items-center",
          floatRight && "justify-end",
        )}
      >
        {value}
      </FunkyFontWrapper>
    </div>
  );
};
