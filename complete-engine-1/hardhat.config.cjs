require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ override: true });

const privateKey = process.env.PRIVATE_KEY;
const accounts = (privateKey && privateKey.startsWith("0x") && privateKey.length === 66) ? [privateKey] : [];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: accounts,
    },
  },
};
