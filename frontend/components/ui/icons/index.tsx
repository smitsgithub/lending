import { FC, SVGProps } from "react";
import { AVAXIcon } from "./avax";
import { ETHIcon } from "./eth";
import { FTXIcon } from "./ftx";
import { Coin } from "../../../commonTypes";

export const Icon: Record<Coin, FC<SVGProps<SVGSVGElement>>> = {
  ETH: ETHIcon,
  FTX: FTXIcon,
  AVAX: AVAXIcon,
};
