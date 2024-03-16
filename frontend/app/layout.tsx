import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
  EthersExtension,
} from "../lib/dynamic";
import Navbar from "./navbar";
import { cn } from "../lib/utils";
import { TooltipProvider } from "../components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lendy.wtf",
  description: "Privacy-first app for lending and borrowing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex flex-col items-center")}>
        <DynamicContextProvider
          settings={{
            environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
            walletConnectors: [EthereumWalletConnectors],
            walletConnectorExtensions: [EthersExtension],
          }}
        >
          <DynamicWagmiConnector>
            <TooltipProvider>
              <div className="max-w-[1240px] w-full flex flex-col">
                <Navbar />
                {children}
              </div>
            </TooltipProvider>
          </DynamicWagmiConnector>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
