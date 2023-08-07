require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// ENV variables
const { INFURA_SEPOLIA_HTTP, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.19",
            },
            {
                version: "0.6.12",
            },
        ],
    },
    networks: {
        sepolia: {
            accounts: [PRIVATE_KEY],
            url: INFURA_SEPOLIA_HTTP,
        },
    },
};
