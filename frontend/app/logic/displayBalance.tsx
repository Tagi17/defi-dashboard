'use client'

import { useAccount, useBalance } from 'wagmi';

import Image from "next/image";

export default function DisplayBalance() {
    interface BalanceData {
        value: bigint;
        symbol: string;
        decimals: number;
        formatted: string;
      }
    const { address: userAddress } = useAccount();
    
    const { data, isError, isLoading, error } = useBalance({
        address: userAddress
    }) as { data?: BalanceData, isError: boolean, isLoading: boolean, error: any };
    

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
                 <span>Ether</span>
                <Image
                    src="/circle.png"
                    alt="Circle"
                    width={20}  
                    height={20}
                    unoptimized={true}  
                />
                <span>{formattedBalance} {data.symbol}</span>
            </div>
        );
    }
    return <div className="text-xl">No balance data available</div>;
}
