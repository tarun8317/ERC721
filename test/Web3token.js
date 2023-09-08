const { expect } = require("chai");
const { ethers } = require("hardhat"); // Import ethers, not hardhat

describe("Web3 ERC721 Token", function () {
  let Web3Token;
  let web3Token;
  let owner;
  let user;
  let provider;

  const providerUrl = "https://sepolia.infura.io/v3/2dc114ea69d045bf904f4ed954d44571"; // Update with your network URL

  before(async function () {
    // Create a new provider
    provider = new ethers.JsonRpcProvider(providerUrl);

    // Get signers using the provider
    [owner, user] = await ethers.getSigners();

    // Deploy the contract using the provider
    Web3Token = await ethers.getContractFactory("Web3");
    web3Token = await Web3Token.connect(owner).deploy();
  });

  it("should have the correct name and symbol", async function () {
    expect(await web3Token.name()).to.equal("Web3");
    expect(await web3Token.symbol()).to.equal("WE3");
  });

  it("it should have a max supply", async function () {
    expect(await web3Token.getMaxSupply()).to.equal("2000");
  });

  it("should allow adding and minting from the allow list", async function () {
    const userAddress = user.address;

    expect(await web3Token.allowList(userAddress)).to.be.false;

    // Set allowlistMintOpen to true (assuming this function exists in your contract)
    await web3Token.connect(owner).editMintWindows(false, true); // Opens both public and allowlist minting windows

    // Add user to the allow list
    await web3Token.connect(owner).setAllowList([userAddress]);

    expect(await web3Token.allowList(userAddress)).to.be.true;

    // Mint from the allow list
    const amountInEther = "0.001"; // Specify the amount in ether as a string
    const amountInWei = ethers.parseEther(amountInEther); // Use ethers here

    await web3Token.connect(user).allowMint({ value: amountInWei });

    const userBalance = await web3Token.balanceOf(userAddress);
    expect(userBalance).to.equal(1);
});

it("should allow public minting and limit the supply", async function () {
    // Define user2 and get their address
    const [user2] = await ethers.getSigners();


    // Enable public minting
    await web3Token.editMintWindows(true, true);

    // Mint from the public (user2)
    const amountInEther = "0.01";
    const amountInWei = ethers.parseEther(amountInEther);
    await web3Token.connect(user2).publicMint({ value: amountInWei });

    // Verify total supply
    const totalSupply = await web3Token.totalSupply();
    expect(totalSupply).to.equal(2);
 
});
it("should allow the owner to withdraw funds", async function () {
    // Send Ether to the contract
    const [user2] = await ethers.getSigners();

    const initialContractBalance = await ethers.provider.getBalance(web3Token.address);
    const oneEther = ethers.parseEther("1.0");

    // Use the transfer method to send Ether to the contract
    await owner.sendTransaction({
      to: web3Token.address,
      value: oneEther,
    });

    // Verify the contract balance increased
    const updatedContractBalance = await ethers.provider.getBalance(web3Token.address);
    expect(updatedContractBalance).to.equal(initialContractBalance.add(oneEther));

    // Withdraw funds to the user's address
    await web3Token.connect(owner).withdraw(user.address);

    // Verify the contract balance is now zero
    const finalContractBalance = await ethers.provider.getBalance(web3Token.address);
    expect(finalContractBalance).to.equal(0);

    // Verify the user's balance increased
    const userBalance = await ethers.provider.getBalance(user2.address);
    expect(userBalance).to.be.gt(0);

    // Verify the owner's balance remains the same or decreased (due to gas fees)
    const ownerBalance = await ethers.provider.getBalance(owner.address);
    expect(ownerBalance).to.be.at.most(initialContractBalance);
  });


});
