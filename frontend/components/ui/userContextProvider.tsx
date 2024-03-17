"use client";

import { ReactNode, createContext, useState } from "react";
import { Header } from "./header";

export const UserContext = createContext<{
  hideData: boolean;
  debugToggleHideData: () => void;
}>({
  hideData: true,
  debugToggleHideData: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [hideData, setHideData] = useState(true);
  return (
    <UserContext.Provider
      value={{
        hideData,
        debugToggleHideData: () => setHideData((val) => !val),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
