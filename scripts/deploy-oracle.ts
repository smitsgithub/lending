const hre = require("hardhat");

async function deploy() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  //   const priceOracleInstance = await hre.ethers.getContractFactory(
  //     "MockPriceOracle",
  //   );

  //   const Factory = await hre.ethers.getContractFactory("Factory");
  //   const Router = await hre.ethers.getContractFactory("Router");

  //   const priceOracleInstanceContract = await priceOracleInstance
  //     .connect(contractOwner)
  //     .deploy({ gasLimit: 900000000 });
  //   await priceOracleInstanceContract.waitForDeployment();

  const priceOracleInstanceAddress =
    "0xCCF4A3DDf6fe9D48231e01aEC5632f1a850BFa20";

  //   console.log(
  //     `priceOracleInstanceContract deployed to: ${priceOracleInstanceAddress}`,
  //   );

  const OracleContract = await hre.ethers.getContractAt(
    "MockPriceOracle",
    priceOracleInstanceAddress,
  );

  const lendingContract = await hre.ethers.getContractAt(
    "MockLendingPool",
    "0xED18a7af35A41A9AAee7eccaAfAf60E42536eA69",
  );

  //   const setOracle = await lendingContract.setPriceOracle(
  //     priceOracleInstanceAddress,
  //   );
  //   await setOracle.wait();
  //   console.log("Oracle set");

  const setFHEprice = await OracleContract.setAssetPrice(
    "0x1b38A893b5b46aaca4BbBB65a91F1bf271f0110C",
    2,
  );
  await setFHEprice.wait();
  console.log("FHE price set");

  const setUSDFCPrice = await OracleContract.setAssetPrice(
    "0x881e4Dc39fAD59Ea8361E52115b037D478a6AE09",
    4,
  );
  await setUSDFCPrice.wait();
  console.log("USDF price set");

  const setFHEstatus = await lendingContract.setPoolStatus(
    "0x1b38A893b5b46aaca4BbBB65a91F1bf271f0110C",
    1,
  );
  await setFHEstatus.wait();
  console.log("FHE price set");

  const setUSDFstatus = await lendingContract.setPoolStatus(
    "0x881e4Dc39fAD59Ea8361E52115b037D478a6AE09",
    1,
  );
  await setUSDFstatus.wait();
  console.log("USDF price set");
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
