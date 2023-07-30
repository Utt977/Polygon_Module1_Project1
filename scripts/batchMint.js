// This script batch mints Indian_ETH ERC721A tokens.

// Import required libraries
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get private key from env
  const myPrivateKey = process.env.PRIVATE_KEY;

  // The URL of the network provider
  const myNetworkAddress = "https://ethereum-goerli.publicnode.com";

  // Create a provider using the URL
  const provider = new ethers.providers.JsonRpcProvider(myNetworkAddress);

  // Create a signer from the private key and provider
  const signer = new ethers.Wallet(myPrivateKey, provider);

  // Tthe address of the deployed contract
  const myContractAddress = "0x8C735E9a8F368665Ed85Fd166130Fe1d20adD48e";

  // Get the contract factory and attach it to the signer
  const myNFT = await ethers.getContractFactory("MyNFT", signer);
  const contract = await myNFT.attach(myContractAddress);

  // Call the mint function on the contract to mint 5 tokens
  await contract.mint(5);

  // Log a message to the console to indicate that the tokens have been minted
  console.log("5 Tokens is minted");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
