const { ethers } = require("hardhat");

const { scriptEmojis } = require("./");

describe(`${scriptEmojis.system} Elevator`, () => {
    let elevator, building;
    const zeroBN = ethers.toBigInt(0);

    describe(`${scriptEmojis.launch} Elevator`, () => {
        it(`should deploy Elevator SC ${scriptEmojis.contract}`, async () => {
            elevator = await ethers.deployContract("Elevator");

            await elevator.waitForDeployment();

            let _address = elevator.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`should have a "top" value ${scriptEmojis.flag}`, async () => {
            let _top = await elevator.top();

            expect(_top).not.equal(null);
            expect(_top).not.equal(undefined);
            expect(_top).equal(false);
        });

        it(`should have a "floor" value ${scriptEmojis.flag}`, async () => {
            let _floorBN = await elevator.floor();

            expect(_floorBN).equal(zeroBN);
            expect(typeof _floorBN).equal(typeof zeroBN);
        });
    });
});
