import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import bgSrc from "./bg.png";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
  EthersExtension,
} from "../lib/dynamic";
import { cn } from "../lib/utils";
import { TooltipProvider } from "../components/ui/tooltip";
import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shadefi",
  description: "Privacy-first app for lending and borrowing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex flex-col items-center bg-main-gradient min-h-screen",
        )}
      >
        <DynamicContextProvider
          settings={{
            environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
            walletConnectors: [EthereumWalletConnectors],
            walletConnectorExtensions: [EthersExtension],
          }}
        >
          <DynamicWagmiConnector>
            <TooltipProvider>
              <div
                className="max-w-[1240px] w-full flex flex-col bg-no-repeat bg-cover flex-grow"
                style={{
                  backgroundImage: `url('${bgSrc.src}')`,
                  backgroundSize: "80%",
                  backgroundPositionY: 280,
                  backgroundPositionX: "center",
                }}
              >
                <Header />
                {children}
              </div>
              <Footer />
            </TooltipProvider>
          </DynamicWagmiConnector>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
