'use client';

import { useAccount, useReadContract } from 'wagmi'

import { erc20Abi } from 'viem';

export default function GetAaveWeth() {
    const address = "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8"
    const { address: userAddress } = useAccount();
    
    const { data: userBalance, isLoading: isLoadingUserBalance } = useReadContract({
        address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args:[userAddress  as `0x${string}`],
    })
    if (!userAddress) return <div>User Address not found</div>
    
    if (isLoadingUserBalance) return <div>Loading...</div>;

    const formattedBalance = (Number(userBalance) / 10 ** 18).toFixed(6);
    return <div>WETH deposit: Balance {formattedBalance}</div>;
}