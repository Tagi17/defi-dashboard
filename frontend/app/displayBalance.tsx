'use client'

import { useAccount, useBalance } from 'wagmi';

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
        return <div>Error: {error.message}</div>; // Adjust according to your error object structure
    }
    
    if (data) {
        const formattedBalance = (Number(data.value) / 10 ** data.decimals).toFixed(2);
        return (
            <div className="text-xl">
                Available balance to deposit: {formattedBalance} {data.symbol}
            </div>
        );
    }
    return <div className="text-xl">No balance data available</div>;
}
