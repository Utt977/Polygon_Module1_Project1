# Polygon Proof Advanced Module-1 of Project 1

## Introduction

This project is the first assignment in Polygon-Advance. The primary objectives of this project are:

1. Deploy an NFT collection on the Ethereum blockchain.
2. Map the NFT collection to the Polygon network.
3. Transfer assets from Ethereum to Polygon using the Polygon Bridge.

## Getting Started

1. Install the required dependencies by running the following command:

   ```
   npm install
   ```

2. After installing the dependencies, you can run the test file using the following command:

   ```
   npx hardhat test
   ```

## Deploying the ERC721 Contract

Before deploying the ERC721 contract, you need to set up your environment variables. Rename the file `.env.example` to `.env` and provide your wallet private key where required, like this:

```
PRIVATE_KEY=your_wallet_private_key_here
```

Now, you can proceed to deploy the ERC721 contract to the Goerli Ethereum Testnet with the following command:

```
npx hardhat run scripts/deploy.js --network goerli
```

After successful deployment, an address will be generated. Copy that address into `contractAddress.js` (located in the metadata folder) and also in `batchMint.js` (stored in the scripts folder).

## Batch Mint NFTs

To mint a batch of NFTs using the deployed ERC721 contract, run the following command:

```
npx hardhat run scripts/batchMint.js --network goerli
```

This script will mint the specified number of NFTs and assign them to your address.

## Approve and Deposit NFTs to Polygon Mumbai

To transfer the minted NFTs from Ethereum to the Polygon Mumbai network using the FxPortal Bridge, execute the following commands:

```
npx hardhat run scripts/approveDeposit.js --network goerli
```

## Author

This project was developed by Uttam Kumar.

## License

This project is licensed under the MIT License.
