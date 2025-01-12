import { aaveOracleAbi, aaveOracleAddress } from "./aaveOracleContractAbi";
import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";

import DialogDepositPopup from "./depositPopup";
import GetBorrow from "./borrowButton";
import { wethGatewayAbi } from "./ethLogic/wethGatewayAbi";

export const AssetInfo = [
  {
    name: "ETH",
    logoSrc: "/ethlogo.png",
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    abi: wethGatewayAbi,
    decimals: 18,
    depositFunctionName: "depositEth",
    borrowFunctionName: "borrowEth",
  },
  {
    name: "USDC",
    logoSrc: "/usdc.png",
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    abi: aaveOracleAbi,
    decimals: 6,
    depositFunctionName: "depositUSDC",
    borrowFunctionName: "borrowUSDC",
  },
];

const AssetList = () => {
  return (
    <div>
      {AssetInfo.map((asset) => {
        console.log("Asset Name:", asset.name, "Asset Address:", asset.address);
        return (
          <div key={asset.address} className="">
            <h3 className="text-4xl font-bold text-green-500">{asset.name}</h3>

            <DialogDepositPopup
              assetName={asset.name}
              assetAddress={asset.address}
              assetAbi={asset.abi}
              decimals={asset.decimals}
              depositFunctionName={asset.depositFunctionName}
            />
            <GetBorrow
              assetName={asset.name}
              assetAddress={asset.address}
              poolAddress={poolAddress}
              poolAbi={poolAbi}
              assetAbi={asset.abi}
              decimals={asset.decimals}
              borrowFunctionName={asset.borrowFunctionName}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AssetList;
