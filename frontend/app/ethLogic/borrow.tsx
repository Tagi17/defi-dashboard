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
import { poolAbi, poolAddress } from "./poolContractAbi";
import { useAccount, useReadContract, useWriteContract, } from "wagmi";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DepositProvider } from './depositContext';
import DisplayBalance from "./displayBalance";
import GetUserDataCollat from "./getUserDataCollat"
import { Input } from "@/components/ui/input";
import { fetchTokenPrice } from "../tokenPrice/tokenInfo";

interface borrowProps {
    asset: string;
    // amount: bigint;
}

const GetBorrow: React.FC<borrowProps> = ({asset}) =>{
    const { address: userAddress } = useAccount();

    interface BorrowParameters{
        asset: string,
        // amount: bigint,
        interestRateMode: bigint,
        referralCode: bigint, 
        onBehalfOf: string
    }
    
    // const [asset, setAsset] = useState<string>("0x82aF49447D8a07e3bd95BD0d56f35241523fBab1");
    // const [amount, setAmount] = useState();
    // const [interestRateMode, setInterestRateMode] = useState<number>(1);
    // const [getBorrow, setGetBorrow] = useState()
    // const [userInputRaw, setUserInputRaw] = useState()
    const [userInputWei, setUserInputWei] = useState<BigInt>()
    const {writeContractAsync} = useWriteContract();

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const newValueWei = BigInt(newValue) * BigInt(10 ** 18);
        setUserInputWei(newValueWei);
    }
    

    const borrowParams: BorrowParameters = {
        asset: asset,
        // amount: amount,
        interestRateMode: BigInt(2),
        referralCode: BigInt(0),
        onBehalfOf: userAddress as `0x${string}`
    }

    async function handleBorrow(){

    const result = await writeContractAsync({
        address: poolAddress as `0x${string}`,
        abi: poolAbi,
        functionName: "borrow",
        args: [asset as `0x${string}`, userInputWei, BigInt(2), BigInt(0), userAddress as `0x${string},`]
    });
}

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-green-500 text-black font-bold px-6"
                        variant="outline"
                    >
                        Borrow
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-black">
          <DialogHeader>
              <DialogTitle className="text-green-500 text-xl">
                  <DepositProvider>
                    Available to borrow: <GetUserDataCollat />
                  </DepositProvider>
            </DialogTitle>
            {/* <DialogTitle className="text-green-500 text-xl">
              Amount to borrow
            </DialogTitle> */}
            <DialogDescription className="text-green-600 text-lg">
              Borrow Balance:
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
            <Button
              type="button"
              variant="secondary"
              onClick={handleBorrow}
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
    )
}
export default GetBorrow;