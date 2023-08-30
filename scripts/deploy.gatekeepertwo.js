const { ethers } = require("hardhat");

const main = async () => {
    try {
        const gatekeeperTwo = await ethers.deployContract("GatekeeperTwo");

        await gatekeeperTwo.waitForDeployment();

        const attackGatekeeperTwo = await ethers.deployContract(
            "AttackGatekeeperTwo",
            [gatekeeperTwo.target]
        );

        await gatekeeperTwo.waitForDeployment();

        console.log(
            `------------------\nAddress of GatekeeperTwo: ${gatekeeperTwo.target}\nAddress of AttackGatekeeperTwo: ${attackGatekeeperTwo.target}\n---------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
