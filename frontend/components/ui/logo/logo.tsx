import Image from "next/image";
import logo from "./logo.png";
import styles from "./logo.module.css";
import { scrollToTop } from "../../../helpers";

export const Logo = () => (
  <div
    onClick={scrollToTop}
    className="h-7 flex items-end self-start cursor-pointer"
  >
    <Image
      src={logo}
      alt="Logo"
      height={28}
      width={36}
      className="inline-block mr-3"
    />
    <span className="font-[NeueBit] text-[32px] leading-[22.85px]">
      lendy
      <span className={styles.logo}>.wtf</span>
    </span>
  </div>
);
