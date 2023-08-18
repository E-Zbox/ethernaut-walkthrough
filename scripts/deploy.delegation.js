const { ethers } = require("hardhat");

const main = async () => {
    try {
        const [owner] = await ethers.getSigners();
        const delegate = await ethers.deployContract("Delegate", [
            owner.address,
        ]);

        await delegate.waitForDeployment();

        console.log(`Address of Delegate: ${delegate.target}`);

        const delegation = await ethers.deployContract("Delegation", [
            delegate.target,
        ]);

        await delegation.waitForDeployment();

        console.log(`Address of Delegation: ${delegation.target}`);

        const attackDelegation = await ethers.deployContract(
            "AttackDelegation"
        );

        await attackDelegation.waitForDeployment();

        console.log(`Address of AttackDelegation: ${attackDelegation.target}`);
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
