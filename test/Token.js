const { expect } = require("chai");

const { scriptEmojis } = require("./");

const totalSupply = 20;

describe(`${scriptEmojis.system}Token`, () => {
    let tokenContract, deployer;

    before(async () => {
        [deployer] = await ethers.getSigners();
        tokenContract = await ethers.deployContract("Token", [totalSupply]);

        await tokenContract.waitForDeployment();
    });

    describe(`${scriptEmojis.launch}deployment`, () => {
        it(`${scriptEmojis.contract} should deploy token contract`, async () => {
            let _address = tokenContract.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);

            expect(ethers.isAddress(_address)).is.true;
        });

        it(`${scriptEmojis.contract} token contract has totalSupply state variable`, async () => {
            let zeroBN = ethers.toBigInt(0);
            let _totalSupplyBN = await tokenContract.totalSupply();

            expect(_totalSupplyBN).not.equal(zeroBN);
            expect(typeof zeroBN).is.equal(typeof _totalSupplyBN);
            expect(_totalSupplyBN).is.equal(ethers.toBigInt(totalSupply));
        });
    });
});
