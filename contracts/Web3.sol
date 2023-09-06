// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Web3 is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;
    uint256 maxSupply = 2000;

    bool public publicMintOpen = false;
    bool public allowListMintOpen = false;

    mapping(address => bool) public allowList;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Web3", "WE3") {}
    
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmXuTQuW4vzWpVaH9gVJkAA8zRJyrhUvyeic3MgUJYVUC8/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    //modify mint windows 
    function editMintWindows (
        bool _publicMintOpen,
        bool _allowListMintOpen
    ) external onlyOwner {
        publicMintOpen = _publicMintOpen;
        allowListMintOpen = _allowListMintOpen;
    }

    //require only the allowlist people to mint
    // Add publicmint and allowlistmintopen varaiables 
    function allowMint() public payable {
        require(allowListMintOpen,"allowlist Mint closed");
        require(allowList[msg.sender],"you are not on the allow list");
        require(msg.value == 0.001 ether, "not enough funds");
        internalMint();
    }

    // Add Payment
    // add limiting supply
    function publicMint() public payable  {
        require(publicMintOpen,"publicMint closed");
        require(msg.value == 0.01 ether, "not enough funds");
        internalMint();
    }

    function internalMint() internal {
        require(totalSupply() < maxSupply, "we sold out");
       uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId); 
    }

    function withdraw(address _addr) external onlyOwner {
        //get the balance of the contract
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

    // populate the allow list
    function setAllowList(address[] calldata addresses) external onlyOwner {
        for(uint256 i = 0; i < addresses.length; i++) {
            allowList[addresses[i]] = true;
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);           
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}