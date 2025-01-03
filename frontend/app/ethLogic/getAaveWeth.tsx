"use client";

import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { erc20Abi } from "viem";
import { fetchTokenPrice } from "../tokenPrice/tokenInfo";

export default function GetAaveWeth() {
  const address = "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8";
  const [wethPrice, setWETHPrice] = useState("");
  const [wethValueinUSD, setWethValueinUSD] = useState("");
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
      setWETHPrice(price);
    }).catch(error => {
      console.error('Failed to fetch WETH price:', error);
    });
  }, []);
  
  useEffect(() => {
    if (!wethPrice || !userBalance) return;

    const balanceInEth = Number(userBalance) / 10 ** 18;
    const valueInUSD = balanceInEth * Number(wethPrice);
    setWethValueinUSD(valueInUSD.toFixed(2));
  }, [userBalance, wethPrice]);


  if (!userAddress) return <div>User Address not found</div>;
  if (isLoadingUserBalance) return <div>Loading...</div>;

  const formattedBalance = (Number(userBalance) / 10 ** 18).toFixed(2);
  return (
    <div className="flex flex-col items-center mr-12">
      {/* <div>My WETH Balance: </div> */}
      <div className="items-center">{formattedBalance} WETH</div>
      {/* <div className="text-sm">Equivalent in USD: ${wethValueinUSD}</div> */}
      <div className="text-sm">${wethValueinUSD}</div>
      <div></div>
    </div>
  );
}