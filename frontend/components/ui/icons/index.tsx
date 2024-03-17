import { FC, SVGProps } from "react";
import { ETHIcon } from "./eth";
import { Token } from "../../../commonTypes";
import { AVAXIcon } from "./avax";

export const Icon: Record<Token, FC<SVGProps<SVGSVGElement>>> = {
  FHE: ETHIcon,
  USDF: AVAXIcon,
};
