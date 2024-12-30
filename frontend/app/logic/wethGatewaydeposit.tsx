"use client";

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
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { wethArbGatewayAddress, wethGatewayAbi } from "./wethGatewayAbi";

import { Button } from "@/components/ui/button";
import DisplayBalance from "./displayBalance";
import GetAaveWeth from "./getAaveWeth";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract } from "wagmi";

//works for any token except eth
export default function WethArbDeposit() {
  const [userInput, setUserInput] = useState("1");
  const [wethPrice, setWethPrice] = useState("");
  const [userInputinWei, setUserInputinWei] = useState(BigInt(10 ** 18));
  const { address: userAddress } = useAccount();

  const { writeContractAsync } = useWriteContract();
  const wethGatewayAddress = wethArbGatewayAddress;

  useEffect(() => {
    const weiValue = BigInt(Math.floor(Number(userInput) * 10 ** 18));
    setUserInputinWei(weiValue);
  }, [userInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  async function handleAaveArbDeposit() {
    try {
      const result = await writeContractAsync({
        address: wethGatewayAddress as `0x${string}`,
        abi: wethGatewayAbi,
        functionName: "depositETH",
        args: [userAddress, userAddress, 0],
        value: userInputinWei,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start">
        <div className="flex">
          <Image src="/ethlogo.png" width={90} height={80} alt="Eth Logo" />
          <div className="flex flex-col ml-4">
            <h3 className="text-3xl font-bold text-green-500">ETH</h3>
            <DisplayBalance />
          </div>
        </div>
        <div className="flex flex-col space-y-2 py-4 px-4">
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
                  Deposit into ETH
                </DialogTitle>
                <DialogDescription className="text-green-600 text-lg">
                  Current Balance:
                </DialogDescription>
                <DialogDescription className="text-green-600 text-lg">
                  APY:
                </DialogDescription>
                {/* <DialogDescription className="text-green-600 text-lg">
                  WETH Price: ${wethPrice}
                </DialogDescription> */}
              </DialogHeader>
              <Input
                id="link"
                defaultValue="Enter Deposit Amount"
                className="text-white"
              />
              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="secondary">
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
      </div>
      <div className="text-green-600 text-lg mt-4 ml-4">
        <GetAaveWeth />
      </div>
    </div>
  );
}
