const { ethers } = require("hardhat");

const main = async () => {
    try {
        let reentrance = await ethers.deployContract("Reentrance");

        await reentrance.waitForDeployment();

        let attackReentrance = await ethers.deployContract("AttackReentrance");

        await attackReentrance.waitForDeployment();

        console.log(
            `--------\nAddress of Reentrance: ${reentrance.target}\nAddress of AttackReentrance: ${attackReentrance.target}\n---------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then()
    .catch(() => process.exit(1));
