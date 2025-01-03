"use client";

import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { erc20Abi } from "viem";
import { fetchTokenPrice } from "../tokenPrice/tokenInfo";

export default function GetAaveUSDC() {
  const address = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
  const [usdcPrice, setusdcPrice] = useState("");
  const [usdcValueinUSD, setusdcValueinUSD] = useState("");
  const { address: userAddress } = useAccount();

  const { data: userBalance, isLoading: isLoadingUserBalance } =
    useReadContract({
      address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [userAddress as `0x${string}`],
    });
  
  
  useEffect(() => {
    fetchTokenPrice().then(price => {
      setusdcPrice(price);
    }).catch(error => {
      console.error('Failed to fetch usdc price:', error);
    });
  }, []);
  
  useEffect(() => {
    if (!usdcPrice || !userBalance) return;

    const balanceInUSDC = Number(userBalance) / 10 ** 18;
    const valueInUSD = balanceInUSDC * Number(usdcPrice);
    setusdcValueinUSD(valueInUSD.toFixed(2));
  }, [userBalance, usdcPrice]);


  if (!userAddress) return <div>User Address not found</div>;
  if (isLoadingUserBalance) return <div>Loading...</div>;

  const formattedBalance = (Number(userBalance) / 10 ** 18).toFixed(2);
  return (
    <div className="flex flex-col items-center mr-12">
      <div className="items-center">{formattedBalance} USDC</div>
      <div className="text-sm">${usdcValueinUSD}</div>
      <div></div>
    </div>
  );
}
