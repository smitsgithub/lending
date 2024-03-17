import { Icon } from "./icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ProperCoin } from "../../commonTypes";

const iconProps = {
  width: 28,
  height: 28,
};
export const CoinSelect = ({
  value,
  onChange,
}: {
  value: ProperCoin;
  onChange: (val: ProperCoin) => void;
}) => {
  return (
    <Select onValueChange={(val) => onChange(val as ProperCoin)} value={value}>
      <SelectTrigger className="w-[142px] shrink-0">
        <CoinSelectValue coin={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <CoinSelectItem coin="FHE" />
          <CoinSelectItem coin="USDF" />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const CoinSelectItem = ({ coin }: { coin: ProperCoin }) => (
  <SelectItem value={coin}>
    <CoinSelectValue coin={coin} />
  </SelectItem>
);

const CoinSelectValue = ({ coin }: { coin: ProperCoin }) => {
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
