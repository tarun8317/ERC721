const { ethers} = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Web3 ERC721 contract with the account:", deployer.address);

  const Web3Token = await ethers.getContractFactory("Web3"); // Use the correct contract name
  const web3Token = await Web3Token.deploy();
  await web3Token.deploymentTransaction()

  console.log("Web3 Token address:", web3Token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
