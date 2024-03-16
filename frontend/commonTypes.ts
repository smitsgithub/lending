export type Coin = "ETH" | "FTX" | "AVAX";

export type Market = {
  name: string;
  poolUtilization: number;
  supplyAPY: number;
  borrowAPY: number;
  coin: Coin;
};

export type Position = {
  coin: Coin;
  name: string;
  amount: number;
  apy: number;
};

export type Action = "Supply" | "Borrow";