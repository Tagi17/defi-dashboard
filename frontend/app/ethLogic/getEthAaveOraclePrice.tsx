import { aaveOracleAbi, aaveOracleAddress } from "../aaveOracleContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";
import { get } from "https";
import { wethAddress } from "./wethAddress";

export default function GetEthAaveOraclePrice() {
  const { address: userAddress } = useAccount();
  const [ethPrice, setEthPrice] = useState<string | undefined>();

  const { data, isError, isLoading } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [wethAddress],
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      try {
        console.log("data recieved in wei", data.toString());
        const priceFormattedEth = formatUnits(data as bigint, 8);
        const roundedEth = parseFloat(priceFormattedEth).toFixed(2);
        setEthPrice(`${roundedEth}`);
      } catch (error) {
        console.log("error fetching eth's price", error);
      }
    }
  }, [data, isError, isLoading]);

  return <div>{ethPrice}</div>;
}
