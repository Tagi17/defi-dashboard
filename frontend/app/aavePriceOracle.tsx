import { aaveOracleAbi, aaveOracleAddress } from "./aaveOracleContractAbi";
import { useEffect, useState } from "react";

import { useReadContract } from "wagmi";

export function useAaveOraclePrice(tokenAddress: string): string | undefined {
  const [price, setPrice] = useState<string | undefined>();
  const { data, isError, isLoading, error } = useReadContract({
    address: aaveOracleAddress as `0x${string}`,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [tokenAddress],
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const priceFormatted = (Number(data) / 1e8).toFixed(2);
      setPrice(priceFormatted);
    }
    if (isError) {
      console.error("Error fetching price from Aave Oracle:", error);
    }
  }, [data, isLoading, isError, error]);

  return price;
}
