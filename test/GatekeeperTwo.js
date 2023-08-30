const { expect } = require("chai");
const { ethers } = require("hardhat");

const { scriptEmojis } = require("./");

describe(`${scriptEmojis.system} GatekeeperTwo`, () => {
    let attackGatekeeperTwo, gatekeeperTwo, deployer, entrant;

    before(async () => {
        [deployer] = await ethers.getSigners();
    });

    describe(`${scriptEmojis.launch} GatekeeperTwo`, () => {
        it(`${scriptEmojis.contract} should deploy GatekeeperTwo SC`, async () => {
            gatekeeperTwo = await ethers.deployContract("GatekeeperTwo");

            await gatekeeperTwo.waitForDeployment();

            let _address = gatekeeperTwo.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`${scriptEmojis.flag} should contain 'entrant' variable`, async () => {
            entrant = await gatekeeperTwo.entrant();

            expect(ethers.isAddress(entrant)).equal(true);
        });
    });

    describe(`${scriptEmojis.mobilize} Mobilize AttackGatekeeperTwo`, () => {
        it(`${scriptEmojis.contract} should deploy AttackGatekeeperTwo SC`, async () => {
            attackGatekeeperTwo = await ethers.deployContract(
                "AttackGatekeeperTwo",
                [gatekeeperTwo.target]
            );

            await attackGatekeeperTwo.waitForDeployment();

            let _address = attackGatekeeperTwo.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`${scriptEmojis.flag} should have an updated entrant value`, async () => {
            let _entrant = await gatekeeperTwo.entrant();

            expect(_entrant).not.equal(entrant);
            expect(_entrant).equal(deployer.address);
        });
    });
});
