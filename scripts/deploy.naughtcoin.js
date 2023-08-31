const { ethers } = require("hardhat");

const main = async () => {
    try {
        const [deployer] = await ethers.getSigners();

        const naughtCoin = await ethers.deployContract("NaughtCoin", [
            deployer.address,
        ]);

        await naughtCoin.waitForDeployment();

        const attackNaughtCoin = await ethers.deployContract(
            "AttackNaughtCoin"
        );

        await attackNaughtCoin.waitForDeployment();

        console.log(
            `----------\nAddress of NaughtCoin: ${naughtCoin.target}\nAddress of AttackNaughtCoin: ${attackNaughtCoin.target}\n-------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
