"use client";

import { useAccount, useBalance } from "wagmi";

import Image from "next/image";
import UseAaveOraclePrice from "./useAaveOraclePrice";

interface DisplayBalanceProps {
  assetName: string;
  assetAddress: string;
  decimals: number;
  symbol: string;
  chainId: number;
}

const DisplayBalance: React.FC<DisplayBalanceProps> = ({
  assetName,
  assetAddress,
  decimals,
  symbol,
  chainId,
}) => {
  interface BalanceData {
    value: bigint;
    symbol: string;
    decimals: number;
    formatted: string;
  }
  // const { address: userAddress } = useAccount();

  // const { data, isError, isLoading, error } = useBalance({
  //   address: userAddress,
  //   chainId: 1,
  //   token: assetAddress as `0x${string}`, 
  // }) as {
  //   data?: BalanceData;
  //   isError: boolean;
  //   isLoading: boolean;
  //   error: any;
  // };
  const price = UseAaveOraclePrice({ assetAddress});
  // if (data) {
  //   const formattedBalance = (Number(data.value) / 10 ** data.decimals).toFixed(
  //     2
  //   );
    return (
      <div className="flex items-center space-x-1 text-sm">
        <span>{assetName}</span>
        <Image
          src="/circle.png"
          alt="Circle"
          width={20}
          height={20}
          unoptimized={true}
        />
        <div>
          {/* <UseAaveOraclePrice assetAddress={assetAddress} decimals={decimals}/> */}
          {/* <UseAaveOraclePrice assetAddress={assetAddress} /> */}
          <div>${price ? price : "Loading..."}</div>
        </div>
      </div>
    );
  }
  // return <div className="text-xl">No balance data available</div>;
// };
export default DisplayBalance;
