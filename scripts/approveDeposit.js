// Import necessary packages and contracts
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require('../artifacts/FXRootContractAbi.js');
const ABI = require('../artifacts/contracts/MyNFT.sol/MyNFT.json');
require('dotenv').config();

//Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {

  // Set up connections to network and wallet
  const myNetworkAddress = 'https://ethereum-goerli.publicnode.com';
  const myPrivateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(myNetworkAddress);

  // Create a wallet instance
  const myWallet = new ethers.Wallet(myPrivateKey, provider);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("MyNFT");
  const nft = await NFT.attach('0x8C735E9a8F368665Ed85Fd166130Fe1d20adD48e');

  // Get FXRoot contract instance
  const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  // TokenIds to transfer
  const myTokenIds = [0, 1, 2, 3, 4]; 

  // Approve the nfts for transfer
  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log('NFT Approval confirmed');

  // Deposit the nfts to the FXRoot contracts
  for (let i = 0; i < myTokenIds; i++) {
    const depositTx = await fxRoot.connect(signer).deposit(
      nft.address,
      myWallet.address, 
      myTokenIds[i],
      '0x6566'
    );

    // Wait for the deposit to be confirmed
    await depositTx.wait();
  }

  console.log("NFT Approved and NFT Deposited");

  
  // Test balanceOf
  const balance = await nft.balanceOf(myWallet.address);

  // Print the balance of the wallet
  console.log("My NFT wallet balance on this address ", myWallet.address, "is: ", balance.toString());
}


// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
