const { ethers } = require("hardhat");

const main = async () => {
    try {
        const telephoneContract = await ethers.deployContract("Telephone");

        await telephoneContract.waitForDeployment();

        const attackTelephoneContract = await ethers.deployContract(
            "AttackTelephone"
        );

        await attackTelephoneContract.waitForDeployment();

        console.log(
            `-----------------\nAddress of Telephone: ${telephoneContract.target}\n---------\nAddress of AttackTelephone: ${attackTelephoneContract.target}\n`
        );
    } catch (error) {
        console.log(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
