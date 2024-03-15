"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useAccount, useNetwork } from "wagmi";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import {
  useAuthenticateConnectedUser,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

export default function Home() {
  const [tab, setTab] = useState("lend");
  const [amount, setAmount] = useState("");
  const { address, isConnected } = useAccount();
  const { primaryWallet, user } = useDynamicContext();
  const { authenticateUser, isAuthenticating } = useAuthenticateConnectedUser();
  const { chain } = useNetwork();

  const onAmountChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    if (!isConnected) {
    } else if (!value || /^\d+(\.\d*)?$/.test(value)) {
      setIsValid(!!value && !value.endsWith("."));
      setAmount(value);
    }
  };
  const onAmountConfirm: MouseEventHandler<HTMLButtonElement> = () => {
    if (!amount) {
      return;
    }
    setAmount("");
    alert(JSON.stringify({ tab, amount }));
  };

  const [isValid, setIsValid] = useState(true);

  console.log({
    address,
    isConnected,
    chain,
    primaryWallet,
    user,
    authenticateUser,
    isAuthenticating,
  });

  return (
    <main className="flex flex-col flex-grow items-center justify-between p-24">
      <Tabs value={tab} className="w-[400px]" onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lend">Lend</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
        </TabsList>
        <TabsContent value="lend">
          <Card>
            <CardHeader>
              <CardTitle>Lend</CardTitle>
              <CardDescription>Select stuff to lend</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Amount</Label>
                <Input
                  value={amount}
                  id="lend-amount"
                  onChange={onAmountChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onAmountConfirm} disabled={!isValid}>
                Lend
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="borrow">
          <Card>
            <CardHeader>
              <CardTitle>Borrow</CardTitle>
              <CardDescription>Select stuff to borrow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Amount</Label>
                <Input
                  value={amount}
                  id="borrow-amount"
                  onChange={onAmountChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onAmountConfirm} disabled={!isValid}>
                Borrow
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
