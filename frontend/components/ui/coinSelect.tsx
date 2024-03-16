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
import { ETHIcon } from "./icons/eth";
import { FTXIcon } from "./icons/ftx";
import { AVAXIcon } from "./icons/avax";

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
  const IconComponent = Icon[value];
  return (
    <Select onValueChange={(val) => onChange(val as Coin)} value={value}>
      <SelectTrigger className="w-[142px] shrink-0">
        <SelectValue>
          <div className="flex flex-row gap-3 text-base items-center">
            <IconComponent {...iconProps} />
            {value}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ETH">
            <div className="flex flex-row gap-3 text-base items-center">
              <ETHIcon {...iconProps} /> ETH
            </div>
          </SelectItem>
          <SelectItem value="FTX">
            <div className="flex flex-row gap-3 text-base items-center">
              <FTXIcon {...iconProps} /> FTX
            </div>
          </SelectItem>
          <SelectItem value="AVAX">
            <div className="flex flex-row gap-3 text-base items-center">
              <AVAXIcon {...iconProps} /> AVAXIcon
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
