import { FC, SVGProps } from "react";
import { ETHIcon } from "./eth";
import { ProperCoin } from "../../../commonTypes";
import { AVAXIcon } from "./avax";

export const Icon: Record<ProperCoin, FC<SVGProps<SVGSVGElement>>> = {
  FHE: ETHIcon,
  USDF: AVAXIcon,
};
