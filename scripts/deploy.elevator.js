const { ethers } = require("hardhat");

const main = async () => {
    try {
        const elevator = await ethers.deployContract("Elevator");

        await elevator.waitForDeployment();

        const building = await ethers.deployContract("Building");

        await building.waitForDeployment();

        console.log(
            `------------\nAddress of Elevator: ${elevator.target}\nAddress of Buidling: ${building.target}\n------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
