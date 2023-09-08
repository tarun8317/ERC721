  require("@nomicfoundation/hardhat-toolbox");
  require("@nomicfoundation/hardhat-ethers");

  const process = require("process");

  const INFURA_API_KEY = "YOUR INFURA API KEY" ;

  const SEPOLIA_PRIVATE_KEY = "YOUR METAMASK PRIVATE KEY";

  /** @type import('hardhat/config').HardhatUserConfig */
  module.exports = {
    solidity: "0.8.18",
    etherscan: {
      apiKey: {
        sepolia: "ETHERSCAN API KEY",
      }
    },
    networks: {
      sepolia: {

        url: `SEPOLIA URL`,
        accounts: [SEPOLIA_PRIVATE_KEY]
      },
      
    }
  };