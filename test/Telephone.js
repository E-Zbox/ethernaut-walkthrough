const { expect } = require("chai");

const { scriptEmojis } = require("./");

describe(`${scriptEmojis.system} Telephone`, () => {
    let owner, attacker, telephoneContract, attackTelephoneContract;

    before(async () => {
        [owner, attacker] = await ethers.getSigners();
    });

    describe(`deployment ${scriptEmojis.launch}`, () => {
        it(`should deploy Telephone Contract${scriptEmojis.contract}`, async () => {
            telephoneContract = await ethers.deployContract("Telephone");

            await telephoneContract.waitForDeployment();

            expect(telephoneContract.target).not.equal("");
            expect(telephoneContract.target).not.equal(0x0);
            expect(telephoneContract.target).not.equal(null);
            expect(telephoneContract.target).not.equal(undefined);
        });

        it(`should deploy AttackTelephone Contract${scriptEmojis.contract}`, async () => {
            attackTelephoneContract = await ethers.deployContract(
                "AttackTelephone"
            );

            await attackTelephoneContract.waitForDeployment();

            expect(attackTelephoneContract.target).not.equal("");
            expect(attackTelephoneContract.target).not.equal(0x0);
            expect(attackTelephoneContract.target).not.equal(null);
            expect(attackTelephoneContract.target).not.equal(undefined);
        });

        it(`should have owner - Telephone Contract${scriptEmojis.contract}`, async () => {
            let owner = await telephoneContract.owner();

            expect(owner).not.equal("");
            expect(owner).not.equal(0x0);
            expect(owner).not.equal(null);
            expect(owner).not.equal(undefined);
        });
    });

    describe(`mobilize ${scriptEmojis.mobilize}`, () => {
        it(`attack - Telephone Contract${scriptEmojis.contract}`, async () => {
            let tx = await attackTelephoneContract
                .connect(attacker)
                .attack(telephoneContract.target);

            await tx.wait();

            let _owner = await telephoneContract.owner();

            expect(_owner).not.equal("");
            expect(_owner).not.equal(0x0);
            expect(_owner).not.equal(null);
            expect(_owner).not.equal(undefined);
            expect(_owner).not.equal(owner.address);
            expect(_owner).equal(_owner);
        });
    });
});
