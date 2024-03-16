export type Coin = "ETH" | "FTX" | "AVAX";

export type Market = {
  name: string;
  poolUtilization: number;
  supplyAPY: number;
  borrowAPY: number;
  coin: Coin;
};