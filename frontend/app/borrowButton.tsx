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
import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import DisplayBalance from "./displayPrice";
import GetAaveWeth from "./ethLogic/getAaveWeth";
import GetUserDataCollat from "./getUserDataCollat";
import { Input } from "@/components/ui/input";
import { StringToBoolean } from "class-variance-authority/types";
import { fetchTokenPrice } from "./tokenPrice/tokenInfo";

// interface borrowProps {
//     asset: string;
//     // amount: bigint;
// }

interface GetBorrowProps {
  assetName: string;
  assetAddress: string;
  poolAddress: string;
  poolAbi: any[];
  assetAbi: any[];
  decimals: number;
  borrowFunctionName: string;
}

const GetBorrow: React.FC<GetBorrowProps> = ({
  assetName,
  assetAddress,
  poolAddress,
  poolAbi,
  decimals,
  borrowFunctionName,
}) => {
  const { address: userAddress } = useAccount();

  interface BorrowParameters {
    asset: string;
    // amount: bigint,
    interestRateMode: bigint;
    referralCode: bigint;
    onBehalfOf: string;
  }
  const [userInputWei, setUserInputWei] = useState<bigint | null>(null);
  const { writeContractAsync } = useWriteContract();

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newValueWei = BigInt(newValue) * BigInt(10 ** 18);
    setUserInputWei(newValueWei);
  };

  const borrowParams: BorrowParameters = {
    asset: assetAddress,
    // amount: amount,
    interestRateMode: BigInt(2),
    referralCode: BigInt(0),
    onBehalfOf: userAddress as `0x${string}`,
  };

  async function handleBorrow() {
    if (!userInputWei || !userAddress) {
      console.error("invalid input or user address");
      return;
    }
    try {
      const result = await writeContractAsync({
        address: poolAddress as `0x${string}`,
        abi: poolAbi,
        functionName: borrowFunctionName,
        args: [
          assetAddress as `0x${string}`,
          userInputWei,
          BigInt(2),
          BigInt(0),
          userAddress as `0x${string},`,
        ],
      });
      console.log("Borrow successful", result);
    } catch (error) {
      console.error("Borrow error", error);
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
            Borrow
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black">
          <DialogHeader>
            <DialogTitle className="text-green-500 text-xl">
              <GetUserDataCollat
                assetAddress={assetAddress}
                poolAddress={poolAddress}
                poolAbi={poolAbi}
                decimals={decimals}
              />
              Borrow {assetName}
              {/* <GetAaveWeth/> */}
            </DialogTitle>
            <DialogDescription className="text-green-600 text-lg">
              Currently Borrowed:
            </DialogDescription>
            <DialogDescription className="text-green-600 text-lg">
              APY:
            </DialogDescription>
          </DialogHeader>
          <Input
            id="link"
            defaultValue="Enter Borrow Amount"
            className="text-white"
            onChange={handleAmount}
          />
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={handleBorrow}>
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
};
export default GetBorrow;
