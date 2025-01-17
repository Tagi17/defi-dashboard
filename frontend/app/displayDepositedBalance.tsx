'use client';

import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";
import { useAccount, useBalance, useReadContract } from 'wagmi'
import { useEffect, useState } from "react";

import GetEthAaveOraclePrice from "./useAaveOraclePrice";
import { erc20Abi } from 'viem';
import { formatUnits } from "viem/utils";

interface DisplayDepositedBalanceProps {
    assetName: string;
    assetAddress: string;
    decimals: number; 
}
interface ReserveData {
    configuration: {
      data: bigint;
    };
    liquidityIndex: bigint;
    currentLiquidityRate: bigint;
    variableBorrowIndex: bigint;
    aTokenAddress: string;
  }
export default function DisplayDepositedBalance({
    assetName, assetAddress, decimals
}: DisplayDepositedBalanceProps) {
    const { address: userAddress } = useAccount();
    const [formattedBalance, setFormattedBalance] = useState("");
    const [tokenValueInUSD, setTokenValueInUSD] = useState("");
    
    const priceInUSD = GetEthAaveOraclePrice({ assetAddress });

    const { data: reserveData } = useReadContract({
        address: poolAddress as `0x${string}`,
        abi: poolAbi,
        functionName: "getReserveData",
        args: [assetAddress],
    });
    const aTokenAddress = reserveData ? (reserveData as any).aTokenAddress : undefined;

    const { data: aTokenBalance, isError: balanceError } = useReadContract({
        address: aTokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [userAddress as `0x${string}`],
    });

    useEffect(() => {
        
        if (aTokenBalance && !balanceError && priceInUSD) {
            const balance = Number(aTokenBalance) / 10 ** decimals;
            const formatted = balance.toFixed(2);
            setFormattedBalance(`${formatted}`);
            const totalUSDValue = (balance * parseFloat(priceInUSD as string)).toFixed(2);
            setTokenValueInUSD(totalUSDValue);
        }
    }, [aTokenBalance, balanceError, priceInUSD, decimals, assetAddress]);

    
    return (
        <div>
        <div className="flex flex-col items-center mr-12">
        <div className="items-center">{formattedBalance} {assetName}</div>
        <div className="text-sm">${tokenValueInUSD}</div>
        </div>
        </div>
    )
    
}