const { ethers } = require("hardhat");

const main = async () => {
    try {
        const password = ethers.encodeBytes32String("uncrackable_passkey");
        const vault = await ethers.deployContract("Vault", [password]);

        await vault.waitForDeployment();

        console.log(`----------\nAddress of Vault: ${vault.target}\n`);
    } catch (error) {
        console.error(error);
    }
};
