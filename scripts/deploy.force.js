const { ethers } = require("hardhat");

const forceSepliaAddress = "0xc3313562e70358B6d580fE178968fE1a97f223d7";
const attackForceSepliaAddress = "0xCbF481d228c7432b05524aF2dAE7130a1Ee609d7";

const main = async () => {
    try {
        const force = await ethers.deployContract("Force");

        await force.waitForDeployment();

        const attackForce = await ethers.deployContract("AttackForce");

        await attackForce.waitForDeployment();

        console.log(
            `--------\nAddress of Force: ${force.target}\nAddress of AttackForce: ${attackForce.target}\n--------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
