const { ethers } = require("hardhat");

const main = async () => {
    try {
        const king = await ethers.deployContract("King");

        await king.waitForDeployment();

        const attackKing = await ethers.deployContract("AttackKing");

        await attackKing.waitForDeployment();

        console.log(
            `\n-----------------Address of King: ${king.target}\nAddress of AttackKing: ${attackKing.target}\n----------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
