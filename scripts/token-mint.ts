const hre = require("hardhat");
import { FhenixClient, Permit, getPermit, removePermit } from "fhenixjs";

async function deploy() {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];
  const lendingAddress = "0xf37E5E5f1641DB2AbEd5c5321DE13CE44d77936A";
  const token1Address = "0x1b38A893b5b46aaca4BbBB65a91F1bf271f0110C";
  const token2Address = "0x881e4Dc39fAD59Ea8361E52115b037D478a6AE09";
  const provider = hre.ethers.provider;
  const instance = new FhenixClient({ provider });

  const amount1 = await instance.encrypt_uint16(1000);
  const amount2 = await instance.encrypt_uint16(1000);
  const token1 = await hre.ethers.getContractAt("FHERC20", token1Address);
  const token2 = await hre.ethers.getContractAt("FHERC20", token2Address);

  const permitToken1 = await getPermit(token1Address, provider);
  instance.storePermit(permitToken1);
  const permissionToken1 = instance.extractPermitPermission(permitToken1);

  const permitToken2 = await getPermit(token2Address, provider);
  instance.storePermit(permitToken2);
  const permissionToken2 = instance.extractPermitPermission(permitToken2);

  //   const mint1 = await token1.mintEncrypted(amount1);
  //   mint1.wait();
  //   console.log("token1 minted");

  //   const mint2 = await token2.mintEncrypted(amount2);
  //   mint2.wait();
  //   console.log("token2 minted");

  // const transfer1 = await token1["transferEncrypted(address, (bytes))"](
  //   "0x91Bbb44C0b17C279271D74deBbb13E1743Ac79EC",
  //   amount1,
  // );
  // transfer1.wait();
  // console.log("token1 transfered");

  // const transfer2 = await token2["transferEncrypted(address, (bytes))"](
  //   "0x91Bbb44C0b17C279271D74deBbb13E1743Ac79EC",
  //   amount2,
  // );
  // transfer2.wait();
  // console.log("token2 transfered");

  const approve1 = await token1["approveEncrypted(address,(bytes))"](
    lendingAddress,
    amount1,
  );
  approve1.wait();
  console.log("token 1 approved");

  const approve2 = await token2["approveEncrypted(address,(bytes))"](
    lendingAddress,
    amount2,
  );
  approve2.wait();
  console.log("token 2 approved");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
