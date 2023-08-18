const { ethers } = require("hardhat");

const main = async () => {
    try {
        const token = await ethers.deployContract("Token");

        await token.waitForDeployment();

        console.log(`Address of Token: ${token.target}`);
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
