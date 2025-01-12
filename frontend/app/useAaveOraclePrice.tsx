import { aaveOracleAbi, aaveOracleAddress } from "./aaveOracleContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";
import { wethAddress } from "./ethLogic/wethAddress";

interface AaveOraclePriceProps {
  assetAddress: string;
  // decimals: number;
}

const UseAaveOraclePrice: React.FC<AaveOraclePriceProps> = ({
  assetAddress,
  // decimals,
}) => {

  if (!assetAddress) {
    console.error("Error: assetAddress is undefined in UseAaveOraclePrice.");
    return null;
  }

  const [price, setPrice] = useState<string | undefined>();

  const { data, isError, isLoading } = useReadContract({
    address: aaveOracleAddress as `0x${string}`,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [assetAddress],
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      try {
        console.log(`Fetching price for asset: ${assetAddress}`);
        console.log(`Data received for asset ${assetAddress}:`, data.toString());
        console.log("Asset Address received in useAaveOraclePrice:", assetAddress);
        const priceFormatted = formatUnits(data as bigint, 8);
        // const priceFormatted = formatUnits(data as bigint, decimals);
        const rounded = parseFloat(priceFormatted).toFixed(2);
        setPrice(`${rounded}`);
      } catch (error) {
        console.log("error fetching eth's price", error);
      }
    }
  }, [data, isError, isLoading, assetAddress]);

  return price;
}
export default UseAaveOraclePrice;