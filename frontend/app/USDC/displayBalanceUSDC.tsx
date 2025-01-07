'use client'

import { useAccount, useBalance } from 'wagmi';

import GetUSDCPrice from "./getUSDCAaveOraclePrice";
import Image from "next/image";

export default function DisplayBalanceUSDC() {
    interface BalanceData {
        value: bigint;
        symbol: string;
        decimals: number;
        formatted: string;
      }
    const { address: userAddress } = useAccount();
    
    const { data, isError, isLoading, error } = useBalance({
        address: userAddress,
        token: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    })
    

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (isError) {
        return <div>Error: {error.message}</div>; 
    }
    
    if (data) {
        const formattedBalance = (Number(data.value) / 10 ** data.decimals).toFixed(2);
        return (
            <div className="flex items-center space-x-2 text-sm">
                 <span>USDC</span>
                <Image
                    src="/circle.png"
                    alt="Circle"
                    width={20}  
                    height={20}
                    unoptimized={true}  
                />
                <span><GetUSDCPrice/></span>
                <span>{data.symbol}</span>
            </div>
        );
    }
    return <div className="text-xl">No balance data available</div>;
}
