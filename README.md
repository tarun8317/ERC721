
This is a erc 721 token creation using solidity and java script. I have used a version of 0.8.9 in solidity and btw its our choice to use any of the versions to use it.

to run this code use these commands in the terminal 

1. npm init -y
2. npx harhat
3. npm install --save-dev hardhat@^2.17.2 @nomicfoundation/hardhat-toolbox@^3.0.0
4. npm install @openzeppelin/contracts
5. npx hardhat compile (to compile your solidity file)
6. npx hardhat run --network sepolia scrips/deploy.js (sepolia is the testnet i have used, if you have any other network replace sepolia with that network)
7. after this command, terminal will give other modules to download using npm install command
8. npx hardhat test 
9. npx hardhat node 
10. npx hardhat verify  --network sepolia your contract address

