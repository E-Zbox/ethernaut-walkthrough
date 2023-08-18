const { ethers } = require("hardhat");

const { scriptEmojis } = require("./");
const { expect } = require("chai");

describe(`${scriptEmojis.system} Privacy`, () => {
    let privacy, attackPrivacy, dataBytes;

    describe(`${scriptEmojis.launch} Privacy`, () => {
        it(`should deploy Privacy SC ${scriptEmojis.contract}`, async () => {
            dataBytes = [
                ethers.encodeBytes32String("not a secret key"),
                ethers.encodeBytes32String("is not a secret key"),
                ethers.encodeBytes32String("is a secret key"),
            ];

            privacy = await ethers.deployContract("Privacy", [dataBytes]);

            await privacy.waitForDeployment();

            let _address = privacy.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`should contain "locked" value ${scriptEmojis.flag}`, async () => {
            let _locked = await privacy.locked();

            expect(_locked).not.equal(null);
            expect(_locked).not.equal(undefined);
            expect(_locked).equal(true);
        });
    });

    describe(`${scriptEmojis.launch} AttackPrivacy`, () => {
        it(`should deploy AttackPrivacy SC ${scriptEmojis.contract}`, async () => {
            attackPrivacy = await ethers.deployContract("AttackPrivacy");

            await attackPrivacy.waitForDeployment();

            let _address = attackPrivacy.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });
    });

    describe(`${scriptEmojis.mobilize} Mobilize`, () => {
        let _data;
        it(`should read storage value of "bytes32[3] private data"\n\tin Privacy SC ${scriptEmojis.contract}`, async () => {
            _data = [
                await ethers.provider.getStorage(privacy.target, 3),
                await ethers.provider.getStorage(privacy.target, 4),
                await ethers.provider.getStorage(privacy.target, 5),
            ];

            expect(dataBytes[0]).equal(_data[0]);
            expect(dataBytes[1]).equal(_data[1]);
            expect(dataBytes[2]).equal(_data[2]);
        });

        it(`should unlock Privacy SC ${scriptEmojis.contract} ${scriptEmojis.padlock}`, async () => {
            let tx = await attackPrivacy.attack(privacy.target, _data[2]);

            await tx.wait();

            let _locked = await privacy.locked();

            expect(_locked).not.equal(null);
            expect(_locked).not.equal(undefined);
            expect(_locked).equal(false);
        });
    });
});
