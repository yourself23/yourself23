import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: PRIVATE_KEY !== "0000000000000000000000000000000000000000000000000000000000000000" ? [PRIVATE_KEY] : [],
      chainId: 8453,
    },
  },
};

export default config;
