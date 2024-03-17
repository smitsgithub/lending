import { FhenixClient, Permit, getPermit, removePermit } from "fhenixjs";

const hre = require("hardhat");

async function LendingCall() {
  //STEPS:
  //   DEPLOY ERC20
  //   DEPLOY FACTORY
  //   DEPLOY ROUTER
  //   MINT ERC20
  //   APPROVE TOKENS TRANSFER
  //   CALL ADDLIQUIDITY
  //   CHECK TOKENS BALANCE
  //   CHECK LP BALANCE

  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  //   alTokenDeployerContract deployed to: 0x57A5090397106DB77Df870bD911Cb1a3A12C8bdF
  //   PoolConfigurationContract deployed to: 0x0Bb5C78F9367D6c188D6b1C139216F23B44C3C7B
  //   lendingDeployerContract deployed to: 0xa9BA363bF58491d8eccbdaF445155A84f619cFb5
  //   FHENIX, FHE  deployed to: 0x1b38A893b5b46aaca4BbBB65a91F1bf271f0110C
  //   USDFHENIX, USDF deployed to: 0x881e4Dc39fAD59Ea8361E52115b037D478a6AE09

  const lendingDeployerContractAddress =
    "0xD3eb78b45Ac9d3e816D90cb294C3Ab526eb71609";
  const FHEAddress = "0x1b38A893b5b46aaca4BbBB65a91F1bf271f0110C";
  const USDFAddress = "0x881e4Dc39fAD59Ea8361E52115b037D478a6AE09";
  const ConfigContract = "0x0Bb5C78F9367D6c188D6b1C139216F23B44C3C7B";
  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const lendingContract = await hre.ethers.getContractAt(
    "MockLendingPool",
    lendingDeployerContractAddress,
  );

  const initPoolFHE = await lendingContract.initPool(
    FHEAddress,
    ConfigContract,
  );
  await initPoolFHE.wait();
  console.log("FHE Pool initialized");

  //   const initPoolUSDF = await lendingContract.initPool(
  //     USDFAddress,
  //     ConfigContract,
  //     {
  //       from: contractOwner,
  //     },
  //   );
  //   await initPoolUSDF.wait();
  //   console.log("USDF Pool initialized");

  //   const amount1 = await instance.encrypt_uint16(1000);
}

if (require.main === module) {
  // === This is for deploying a new diamond ===
  LendingCall()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
