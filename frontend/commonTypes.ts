export const tokens = {
  FHE: {
    // FIXME:
    name: "Fhenix",
    symbol: "FHE",
    address: "0x1b38A893b5b46aaca4BbBB65a91F1bf271f0110C",
    tempHardcoded: {
      poolUtilization: 97,
      supplyAPY: 13.4,
      borrowAPY: 12.3,
    },
  },
  USDF: {
    // FIXME:
    name: "USDF",
    symbol: "USDF",
    address: "0x881e4Dc39fAD59Ea8361E52115b037D478a6AE09",
    tempHardcoded: {
      poolUtilization: 98,
      supplyAPY: 12.4,
      borrowAPY: 11.3,
    },
  },
} as const;

export type ProperCoin = keyof typeof tokens;

export type Market = {
  name: string;
  poolUtilization: number;
  supplyAPY: number;
  borrowAPY: number;
  coin: ProperCoin;
};

export type Position = {
  coin: ProperCoin;
  name: string;
  amount: bigint;
  apy: number;
};

export type Action = "Supply" | "Borrow";
export type RestorativeAction = "Withdraw" | "Repay";

export type UserBalance = {
  liquidityBalance: bigint;
  borrowBalance: bigint;
};
