const { expect } = require("chai");
const { ethers } = require("hardhat");

const { scriptEmojis } = require("./");

describe(`${scriptEmojis.system} NaughtCoin`, () => {
    let deployer;
    let naughtCoin, attackNaughtCoin;
    let initialOwnerBalanceBN;

    const name = "NaughtCoin";
    const symbol = "0x0";
    const INITIAL_SUPPLY = 1000000;

    const zeroBN = ethers.toBigInt(0);

    before(async () => {
        [deployer] = await ethers.getSigners();
    });

    describe(`${scriptEmojis.launch} NaughtCoin`, () => {
        it(`${scriptEmojis.contract} should deploy NaughtCoin SC`, async () => {
            naughtCoin = await ethers.deployContract("NaughtCoin", [deployer]);

            await naughtCoin.waitForDeployment();

            let _address = naughtCoin.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`${scriptEmojis.flag} should have a name`, async () => {
            let _name = await naughtCoin.name();

            expect(_name).not.equal("");
            expect(_name).not.equal(null);
            expect(_name).not.equal(undefined);
            expect(_name).equal(name);
        });

        it(`${scriptEmojis.flag} should have a symbol`, async () => {
            let _symbol = await naughtCoin.symbol();

            expect(_symbol).not.equal("");
            expect(_symbol).not.equal(null);
            expect(_symbol).not.equal(undefined);
            expect(_symbol).equal(symbol);
        });

        it(`${scriptEmojis.money} should have an owner's balance`, async () => {
            initialOwnerBalanceBN = await naughtCoin.balanceOf(
                deployer.address
            );

            let initialOwnerBalance =
                Number(initialOwnerBalanceBN) /
                10 ** Number(await naughtCoin.decimals());

            expect(initialOwnerBalanceBN).not.equal(zeroBN);
            expect(initialOwnerBalance).not.equal(0);
            expect(initialOwnerBalance).equal(INITIAL_SUPPLY);
        });
    });

    describe(`${scriptEmojis.launch} AttackNaughtCoin`, () => {
        it(`${scriptEmojis.contract} should deploy AttackNaughtCoin SC`, async () => {
            attackNaughtCoin = await ethers.deployContract("AttackNaughtCoin");

            await attackNaughtCoin.waitForDeployment();

            let _address = attackNaughtCoin.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`${scriptEmojis.flag} should have an owner`, async () => {
            let _owner = await attackNaughtCoin.owner();

            expect(_owner).not.equal("");
            expect(_owner).not.equal(0x0);
            expect(_owner).not.equal(null);
            expect(_owner).not.equal(undefined);
            expect(_owner).equal(deployer.address);
        });
    });

    describe(`${scriptEmojis.mobilize} Mobilize`, () => {
        it(`${scriptEmojis.flag} should approve all owner's balance to AttackMobilize SC`, async () => {
            let tx = await naughtCoin.approve(
                attackNaughtCoin.target,
                initialOwnerBalanceBN
            );

            await tx.wait();

            let attackNaughtCoinAllowanceBN = await naughtCoin.allowance(
                deployer.address,
                attackNaughtCoin.target
            );

            expect(attackNaughtCoinAllowanceBN).not.equal(zeroBN);
            expect(attackNaughtCoinAllowanceBN).equal(initialOwnerBalanceBN);
        });

        it(`${scriptEmojis.flag} should bypass lock and transfer owner's balance to AttackMobilize SC`, async () => {
            let tx = await attackNaughtCoin.attack(naughtCoin.target);

            await tx.wait();

            let _attackNaughtCoinBalanceBN = await naughtCoin.balanceOf(
                attackNaughtCoin.target
            );
            let _ownerBalanceBN = await naughtCoin.balanceOf(deployer.address);

            expect(_attackNaughtCoinBalanceBN).not.equal(zeroBN);
            expect(_attackNaughtCoinBalanceBN).equal(initialOwnerBalanceBN);

            expect(_ownerBalanceBN).equal(zeroBN);
            expect(_ownerBalanceBN).not.equal(initialOwnerBalanceBN);
        });
    });
});
