"use client";

import { DepositProvider, useDeposit } from "./depositContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAccount, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import {
  wethArbGatewayAddress,
  wethGatewayAbi,
} from "./ethLogic/wethGatewayAbi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DialogDepositPopupProps {
  assetName: string;
  assetAddress: string;
  assetAbi: any[];
  decimals: number;
  depositFunctionName: string;
}

export default function DialogDepositPopup({
  assetName,
  assetAddress,
  assetAbi,
  decimals,
  depositFunctionName,
}: DialogDepositPopupProps) {
  const [userInput, setUserInput] = useState("1");
  const [wethPrice, setWethPrice] = useState("");
  const [userInputInWei, setUserInputInWei] = useState(BigInt(10 ** 18));
  const { address: userAddress } = useAccount();

  const { writeContractAsync } = useWriteContract();
  const wethGatewayAddress = wethArbGatewayAddress;
  const { setDepositAmount } = useDeposit();

  useEffect(() => {
    const weiValue = BigInt(Math.floor(Number(userInput) * 10 ** 18));
    setUserInputInWei(weiValue);
  }, [userInput]);

  async function handleAaveArbDeposit() {
    if (!userAddress) {
      console.error("user address not defined");
      return;
    }
    try {
      if (assetName === "ETH"){
      const result = await writeContractAsync({
        address: assetAddress as `0x${string}`,
        abi: assetAbi,
        functionName: depositFunctionName,
        args: [userAddress, userAddress, 0],
        value: userInputInWei,
      });
      console.log("deposit successful", result);
    } else {
      const result = await writeContractAsync({
        address: assetAddress as `0x${string}`,
        abi: assetAbi,
        functionName: depositFunctionName,
        args: [userAddress, userInputInWei, 0],
      });
    }
      setDepositAmount(userInputInWei);
      console.log("Updated deposit amount to:", userInputInWei.toString());
    } catch (error) {
      console.log("error during deposit", error);
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-green-500 text-black font-bold px-6"
            variant="outline"
          >
            Deposit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black">
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl">
              Deposit into {assetName}
            </DialogTitle>
            <DialogDescription className="text-green-600 text-lg">
              Current Balance:
            </DialogDescription>
            <DialogDescription className="text-green-600 text-lg">
              APY:
            </DialogDescription>
            <DialogDescription className="text-green-600 text-lg">
              <Switch id="enable-mode" />
              <Label htmlFor="enable-mode">Enable as Collateral</Label>
            </DialogDescription>
          </DialogHeader>
          <Input
            id="link"
            defaultValue="Enter Deposit Amount"
            className="text-white"
          />
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAaveArbDeposit}
            >
              Confirm
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
