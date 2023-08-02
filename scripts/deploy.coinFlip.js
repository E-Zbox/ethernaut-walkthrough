const { ethers } = require("hardhat");

const main = async () => {
    const coinFlip = await ethers.deployContract("CoinFlip");

    await coinFlip.waitForDeployment();

    const attackCoinFlip = await ethers.deployContract("AttackCoinFlip", [
        coinFlip.target,
    ]);

    await attackCoinFlip.waitForDeployment();

    console.log(
        `Address of CoinFlip: ${coinFlip.target}\n-----------\nAddress of AttackCoinFlip: ${attackCoinFlip.target}\n------------------`
    );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
