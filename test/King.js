const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { ethers } = require("hardhat");

chai.use(chaiAsPromised);

const { scriptEmojis } = require("./");

let king, attackKing, deployer, thirdKing;

const initialPrize = ethers.parseEther("0.5");

const { expect } = chai;

describe(`${scriptEmojis[0]}King`, () => {
    before(async () => {
        [deployer, thirdKing] = await ethers.getSigners();
        king = await ethers.deployContract("King", { value: initialPrize });

        await king.waitForDeployment();
    });

    it(`${
        scriptEmojis[scriptEmojis.length - 1]
    } should deploy King contract`, async () => {
        let _address = king.target;

        expect(_address).not.equal("");
        expect(_address).not.equal(null);
        expect(_address).not.equal(undefined);

        expect(ethers.isAddress(_address)).true;
    });

    it(`${
        scriptEmojis[scriptEmojis.length - 1]
    } should have a prize`, async () => {
        const zeroBN = ethers.toBigInt(0);
        const _prize = await king.prize();

        expect(_prize).not.equal(zeroBN);

        expect(_prize).equal(initialPrize);
    });

    it(`${
        scriptEmojis[scriptEmojis.length - 1]
    } should have an owner`, async () => {
        const _owner = await king.owner();

        expect(_owner).not.equal("");
        expect(_owner).not.equal(null);
        expect(_owner).not.equal(undefined);
        expect(ethers.isAddress(_owner)).is.true;

        expect(_owner).equal(deployer.address);
    });

    it(`${scriptEmojis[4]} has King`, async () => {
        const _king = await king._king();

        expect(_king).not.equal("");
        expect(_king).not.equal(null);
        expect(_king).not.equal(undefined);
        expect(ethers.isAddress(_king)).is.true;

        expect(_king).equal(deployer.address);
    });
});

describe(`${scriptEmojis[0]} AttackKing`, () => {
    before(async () => {
        attackKing = await ethers.deployContract("AttackKing");

        await attackKing.waitForDeployment();
    });

    it(`${
        scriptEmojis[scriptEmojis.length - 1]
    } should deploy AttackKing contract`, async () => {
        const _address = attackKing.target;

        expect(_address).not.equal("");
        expect(_address).not.equal(null);
        expect(_address).not.equal(undefined);

        expect(ethers.isAddress(_address)).true;
    });

    it(`${scriptEmojis[2]} mobilize`, async () => {
        const oneEther = ethers.parseEther("1");
        let tx = await attackKing.attack(king.target, { value: oneEther });

        await tx.wait();

        // let's check if the value of King updated to attackKing contract address
        let _kingAddress = await king._king();

        expect(_kingAddress).not.equal("");
        expect(_kingAddress).equal(attackKing.target);
    });

    it(`${scriptEmojis[5]} more ETH is King ${scriptEmojis[4]}`, async () => {
        const twoEther = ethers.parseEther("2");

        await expect(
            thirdKing.sendTransaction({
                to: king.target,
                value: twoEther,
            })
        ).rejected;
    });
});
