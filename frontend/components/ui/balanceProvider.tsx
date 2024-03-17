"use client";

import { ReactNode, createContext, useContext, useEffect } from "react";

import { ProperCoin, UserBalance } from "../../commonTypes";
import { useUserPoolData } from "../../hooks/useUserPoolData";

export const BalanceContext = createContext<{
  balance: Record<ProperCoin, UserBalance> | undefined;
}>({
  balance: undefined,
});

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const fheBalance = useUserPoolData("FHE");
  const usdfBalance = useUserPoolData("USDF");
  const balanceReady = fheBalance && usdfBalance;
  return (
    <BalanceContext.Provider
      value={{
        balance: balanceReady && {
          FHE: fheBalance,
          USDF: usdfBalance,
        },
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
