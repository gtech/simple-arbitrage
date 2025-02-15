// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const executor_wallet_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 
  const FlashBotsMultiCall = await hre.ethers.getContractFactory("FlashBotsMultiCall");
  const multicallInstance = await FlashBotsMultiCall.deploy(executor_wallet_address);

  await multicallInstance.deployed();

  const FlashBotsUniswapQuery = await hre.ethers.getContractFactory("FlashBotsUniswapQuery");
  const queryInstance = await FlashBotsUniswapQuery.deploy();

  await queryInstance.deployed();

  console.log("FlashBotsMultiCall deployed to:", multicallInstance.address);
  console.log("FlashBotsUniswapQuery deployed to:", queryInstance.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
