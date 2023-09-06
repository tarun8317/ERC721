// const { expect } = require("chai");

// describe("Web3 ERC721 Token", function () {
//   let Web3Token;
//   let web3Token;
//   let owner;
//   let user;

//   beforeEach(async function () {
//     [owner, user] = await ethers.getSigners();

//     Web3Token = await ethers.getContractFactory("Web3");
//     web3Token = await Web3Token.deploy();
//     await web3Token.deployed();
//   });

//   it("should have the correct name and symbol", async function () {
//     expect(await web3Token.name()).to.equal("Web3");
//     expect(await web3Token.symbol()).to.equal("WE3");
//   });

//   it("should allow the owner to pause and unpause the contract", async function () {
//     expect(await web3Token.paused()).to.be.false;

//     await web3Token.connect(owner).pause();
//     expect(await web3Token.paused()).to.be.true;

//     await web3Token.connect(owner).unpause();
//     expect(await web3Token.paused()).to.be.false;
//   });

//   it("should allow the owner to edit mint windows", async function () {
//     expect(await web3Token.publicMintOpen()).to.be.false;
//     expect(await web3Token.allowListMintOpen()).to.be.false;

//     await web3Token.connect(owner).editMintWindows(true, true);

//     expect(await web3Token.publicMintOpen()).to.be.true;
//     expect(await web3Token.allowListMintOpen()).to.be.true;
//   });

//   it("should allow adding and minting from the allow list", async function () {
//     const userAddress = user.address;

//     expect(await web3Token.allowList(userAddress)).to.be.false;

//     // Add user to the allow list
//     await web3Token.connect(owner).setAllowList([userAddress]);

//     expect(await web3Token.allowList(userAddress)).to.be.true;

//     // Mint from the allow list
//     await web3Token.connect(user).allowMint({ value: ethers.utils.parseEther("0.001") });

//     const userBalance = await web3Token.balanceOf(userAddress);
//     expect(userBalance).to.equal(1);
//   });

//   it("should allow public minting and limit the supply", async function () {
//     expect(await web3Token.publicMintOpen()).to.be.false;

//     // Open public minting
//     await web3Token.connect(owner).editMintWindows(true, true);

//     expect(await web3Token.publicMintOpen()).to.be.true;

//     const initialSupply = await web3Token.totalSupply();

//     // Minting should increase the total supply
//     await web3Token.connect(user).publicMint({ value: ethers.utils.parseEther("0.01") });

//     const newSupply = await web3Token.totalSupply();
//     expect(newSupply).to.equal(initialSupply.add(1));

//     // Ensure the supply doesn't exceed the max supply
//     expect(newSupply).to.be.at.most(2000);
//   });

//   it("should allow the owner to withdraw funds", async function () {
//     const initialContractBalance = await ethers.provider.getBalance(web3Token.address);

//     // Send some ether to the contract
//     await owner.sendTransaction({
//       to: web3Token.address,
//       value: ethers.utils.parseEther("1.0"),
//     });

//     // Check the contract balance
//     const updatedContractBalance = await ethers.provider.getBalance(web3Token.address);
//     expect(updatedContractBalance).to.equal(initialContractBalance.add(ethers.utils.parseEther("1.0")));

//     // Withdraw funds
//     await web3Token.connect(owner).withdraw(owner.address);

//     // Check the contract balance after withdrawal (should be 0)
//     const finalContractBalance = await ethers.provider.getBalance(web3Token.address);
//     expect(finalContractBalance).to.equal(0);

//     // Check owner's balance after withdrawal
//     const ownerBalance = await ethers.provider.getBalance(owner.address);
//     expect(ownerBalance).to.be.gt(initialContractBalance);
//   });
// });


const { expect } = require("chai");

describe("Web3 ERC721 Token", function () {
  let Web3Token;
  let web3Token;
  let owner;
  let user;
  let provider; // Add a provider variable

  // Define the provider URL for your Ethereum network (e.g., Hardhat Network)

  const providerUrl = "http://127.0.0.1:8545/"; // Update with your network URL

  before(async function () {
    // Create a new provider
    provider = new ethers.JsonRpcProvider(providerUrl);

    // Get signers using the provider
    [owner, user] = await ethers.getSigners();

    // Deploy the contract using the provider
    Web3Token = await ethers.getContractFactory("Web3");
    web3Token = await Web3Token.connect(owner).deploy();
    await web3Token.deployed();
  });

  it("should deploy the token", async function () {
    expect(web3Token.address).to.not.be.undefined;
  });

  it("should have the correct name and symbol", async function () {
    expect(await web3Token.name()).to.equal("Web3");
    expect(await web3Token.symbol()).to.equal("WE3");
  });
});
