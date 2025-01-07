import { aaveOracleAbi, aaveOracleAddress } from "../aaveOracleContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

export default function GetUSDCPrice() {
    const { address: userAddress } = useAccount();
    const [USDCPrice, setUSDCPrice] = useState<string | undefined>();
    const USDCAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
    
    const { data, isError, isLoading } = useReadContract({
      address: aaveOracleAddress,
      abi: aaveOracleAbi,
      functionName: "getAssetPrice",
      args: [USDCAddress],
    });
  
    useEffect(() => {
      if (data && !isLoading && !isError) {
        try {
          console.log("data recieved in wei", data.toString());
          const priceFormattedUSDC = formatUnits(data as bigint, 8);
          const roundedUSDC = parseFloat(priceFormattedUSDC).toFixed(2);
          setUSDCPrice(`${roundedUSDC}`);
        } catch (error) {
          console.log("error fetching eth's price", error);
        }
      }
    }, [data, isError, isLoading]);
  
    return <div>{USDCPrice}</div>;
  }
  