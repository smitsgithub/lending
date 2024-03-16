import { Icon } from "./icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Coin } from "../../commonTypes";

const iconProps = {
  width: 28,
  height: 28,
};
export const CoinSelect = ({
  value,
  onChange,
}: {
  value: Coin;
  onChange: (val: Coin) => void;
}) => {
  return (
    <Select onValueChange={(val) => onChange(val as Coin)} value={value}>
      <SelectTrigger className="w-[142px] shrink-0">
        <CoinSelectValue coin={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <CoinSelectItem coin="ETH" />
          <CoinSelectItem coin="FTX" />
          <CoinSelectItem coin="AVAX" />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const CoinSelectItem = ({ coin }: { coin: Coin }) => (
  <SelectItem value={coin}>
    <CoinSelectValue coin={coin} />
  </SelectItem>
);

const CoinSelectValue = ({ coin }: { coin: Coin }) => {
  const IconComponent = Icon[coin];
  return (
    <SelectValue>
      <div className="flex flex-row gap-3 text-base items-center">
        <IconComponent {...iconProps} />
        {coin}
      </div>
    </SelectValue>
  );
};
