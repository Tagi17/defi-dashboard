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
import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract, } from "wagmi";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import GetDebtTokenUSDC from "./debtTokenUSDC"
import { Input } from "@/components/ui/input"
;
import { fetchTokenPrice } from "../tokenPrice/tokenInfo";

interface borrowProps {
    asset: string;
    decimals: number;
}

const GetBorrowUSDC: React.FC<borrowProps> = ({ asset, decimals}) =>{
    const { address: userAddress } = useAccount();
    const [userInputWei, setUserInputWei] = useState<BigInt>()
    const {writeContractAsync} = useWriteContract();

    interface BorrowParameters{
        asset: string,
        interestRateMode: bigint,
        referralCode: bigint, 
        onBehalfOf: string
    }

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const newValueWei = BigInt(newValue) * BigInt(10 ** decimals);
        setUserInputWei(newValueWei);
    }
    
    const borrowParams: BorrowParameters = {
        asset: asset,
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
              Amount to borrow
            </DialogTitle>
            <DialogDescription className="text-green-600 text-lg">
                <GetDebtTokenUSDC assetAddress={asset} decimals={decimals}/>
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
export default GetBorrowUSDC;