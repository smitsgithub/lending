"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { abi } from "../../abi/MockLandingPoolAbi";
import { generatePermits, lendingPoolAddress, provider } from "../../permits";
import { Permission } from "fhenixjs";

export const UserContext = createContext<{
  permission?: Permission;
  tokenInContract?: ethers.Contract;
  getPermission: () => void;
}>({
  getPermission: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [tokenInContract, setTokenInContract] = useState<ethers.Contract>();
  const [permission, setPermission] = useState<Permission>();
  useEffect(() => {
    (async () => {
      const signer = await provider.getSigner();
      const tokenInContract = new ethers.Contract(
        lendingPoolAddress,
        abi,
        signer,
      );
      setTokenInContract(tokenInContract);
    })();
  }, []);

  const getPermission = useCallback(async () => {
    const permission = await generatePermits(lendingPoolAddress, provider);
    setPermission(permission);
  }, []);
  return (
    <UserContext.Provider
      value={{
        tokenInContract,
        getPermission,
        permission,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
