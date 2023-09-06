  require("@nomicfoundation/hardhat-toolbox");
  const process = require("process");

  const INFURA_API_KEY = "2dc114ea69d045bf904f4ed954d44571" ;

  const SEPOLIA_PRIVATE_KEY = "7ef69b2d31c1fceab54ce3652ee5215f64b0850b5bfd3631023a72a9f05474d3";

  /** @type import('hardhat/config').HardhatUserConfig */
  module.exports = {
    solidity: "0.8.18",
    etherscan: {
      apiKey: {
        sepolia: "2WA3995HHBNABVA4T9Y2IUAEVTRFBGD5V9",
      }
    },
    networks: {
      sepolia: {

        url: `https://sepolia.infura.io/v3/2dc114ea69d045bf904f4ed954d44571`,
        accounts: [SEPOLIA_PRIVATE_KEY]
      },
      
    }
  };