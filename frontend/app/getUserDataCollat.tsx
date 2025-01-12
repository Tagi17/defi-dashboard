"use client";

import { DepositProvider, useDeposit } from "./depositContext";
import { aaveOracleAbi, aaveOracleAddress } from "./aaveOracleContractAbi";
import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import UseAaveOraclePrice from "./useAaveOraclePrice";
import { formatUnits } from "viem/utils";
import { wethAddress } from "./ethLogic/wethAddress";

interface GetUserDataCollatProps {
  assetAddress: string;
  decimals: number;
  poolAddress: string;
  poolAbi: any[];
}
const GetUserDataCollat: React.FC<GetUserDataCollatProps> = ({
  assetAddress,
  poolAddress,
  poolAbi,
  decimals,
}) => {
  const ethAddress = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
  const usdcAddress = "0xA0b86991C6218b36c1D19D4a2e9Eb0cE3606eB48";

  const ethPrice = UseAaveOraclePrice({ assetAddress: ethAddress });
  const usdcPrice = UseAaveOraclePrice({ assetAddress: usdcAddress });
  const { address: userAddress } = useAccount();
  const [userData, setUserData] = useState<UserAccountData | null>(null);
  const { depositAmount } = useDeposit();
  // const ethPrice = UseEthAaveOraclePrice({ assetAddress, decimals});

  const [availableToBorrowETH, setAvailableToBorrowETH] = useState<
    string | undefined
  >();
  const [availableToBorrowUSDC, setAvailableToBorrowUSDC] = useState<
    string | undefined
  >();

  console.log(
    "Current deposit amount in GetUserDataCollat:",
    depositAmount.toString()
  );
  type UserAccountDataRaw = [bigint, bigint, bigint, bigint, bigint, bigint];

  interface UserAccountData {
    totalCollateralBase: bigint;
    totalDebtBase: bigint;
    availableBorrowsBase: bigint;
    currentLiquidationThreshold: bigint;
    ltv: bigint;
    healthFactor: bigint;
  }
  if (!userAddress) {
    console.error("user address not defined");
    return;
  }
  const { data, isError } = useReadContract({
    address: poolAddress as `0x${string}`,
    abi: poolAbi,
    functionName: "getUserAccountData",
    args: [userAddress],
  });

  useEffect(() => {
    console.log("Fetching user data:", data);
    if (data) {
      console.log("Contract data received:", data);
      const rawData = data as UserAccountDataRaw; // Assert to the expected data type
      const formattedData: UserAccountData = {
        totalCollateralBase: rawData[0],
        totalDebtBase: rawData[1],
        availableBorrowsBase: rawData[2],
        currentLiquidationThreshold: rawData[3],
        ltv: rawData[4],
        healthFactor: rawData[5],
      };
      setUserData(formattedData);
      console.log("data recieved in wei", data.toString());
    } else if (isError) {
      console.error("Error fetching user data from contract", isError);
    }
  }, [data, isError]); 

  useEffect(() => {
    if (userData && ethPrice && usdcPrice) {
      const ethPriceValue = parseFloat(ethPrice.toString());
      const availableToBorrowEth =
        Number(userData.availableBorrowsBase) / 1e9 / ethPriceValue;
      console.log("Calculated availableToBorrowEth:", availableToBorrowEth);
      setAvailableToBorrowETH(availableToBorrowEth.toFixed(2));
      console.log("Available to borrow in ETH:", `${availableToBorrowEth}`);
      console.log("USDC", usdcPrice)
      const usdcPriceValue = parseFloat(usdcPrice.toString());
      const availableToBorrowUSDC =
        Number(userData.availableBorrowsBase) / 10 ** 18 / usdcPriceValue;
        // const availableToBorrowUSDC = Number(userData.availableBorrowsBase) / 10 ** 8;
      console.log("Calculated availableToBorrowUSDC:", availableToBorrowUSDC);
      setAvailableToBorrowUSDC(availableToBorrowUSDC.toFixed(2));
      console.log("Available to borrow in USDC:", `${availableToBorrowUSDC}`);
    }
  }, [userData, ethPrice, usdcPrice]);

  const availableBorrows =
    userData?.availableBorrowsBase !== undefined
      ? formatUnits(userData.availableBorrowsBase, 18)
      : "Loading...";
  console.log("Available borrows:", availableBorrows);

  console.log(userData?.availableBorrowsBase);

  // get the amount of eth that you can borrow
  // getUserData.availableBorrowsBase / current price of eth
  // const availableToBorrowUSD = userData?.availableBorrowsBase  || null;
  // const availableToBorrowETH = availableToBorrowUSD / BigInt(ethPrice);

  return (
    <div>
      <br />
      <div>
        Available to Borrow:{" "}
        {userData ? `${availableToBorrowETH} ETH` : "Loading..."}
        {userData ? `${availableToBorrowUSDC} ETH` : "Loading..."}
      </div>
      {/* <div>Health Factor: {userData ? userData.healthFactor.toString() : 'N/A'}</div> */}
    </div>
  );
};
export default GetUserDataCollat;
