import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/ui/userContextProvider";
import { ProperCoin, tokens } from "../commonTypes";
import { fhenixClient } from "../permits";

export const useSupply = ({
  token,
  amount,
  cb,
}: {
  token: ProperCoin;
  amount: number;
  cb: (err?: unknown) => void;
}) => {};
