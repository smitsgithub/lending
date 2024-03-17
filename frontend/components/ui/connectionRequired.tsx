import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { FC, PropsWithChildren, useState } from "react";
import { FunkyFontWrapper } from "./funkyFontWrapper";

export const ConnectionRequired: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useDynamicContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  if (isFirstRender) {
    setIsFirstRender(false);
    return (
      <main className="flex-grow min-h-[300px] grid items-center">
        <div className="mx-auto border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#7C3AED]" />
      </main>
    );
  }
  if (isAuthenticated) {
    return children;
  }
  return (
    <main className="flex-grow min-h-[300px] grid items-center">
      <FunkyFontWrapper className="text-[60px] text-center">
        Connect the wallet
        <br />
        to use the app
      </FunkyFontWrapper>
    </main>
  );
};
