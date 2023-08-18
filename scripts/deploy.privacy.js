const { ethers } = require("hardhat");

const main = async () => {
    try {
        const data = [
            ethers.encodeBytes32String("some unhackable password here"),
            ethers.encodeBytes32String("secret-key-bitcoin-backdoor"),
            ethers.encodeBytes32String("keyGetsCrackedFromUniverse.."),
        ];
        const privacy = await ethers.deployContract("Privacy", [data]);
        const attackPrivacy = await ethers.deployContract("AttackPrivacy");

        await privacy.waitForDeployment();

        await attackPrivacy.waitForDeployment();

        console.log(
            `-----------\nAddress of Privacy: ${privacy.target}\nAddress of AttackPrivacy: ${attackPrivacy.target}\n--------------`
        );
    } catch (error) {
        console.error(error);
    }
};

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
