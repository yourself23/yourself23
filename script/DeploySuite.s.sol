// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {WillstoneNexusMaster} from "../src/WillstoneNexusMaster.sol";
import {SovereignBridgeGateway} from "../src/SovereignBridgeGateway.sol";
import {StandaloneDaiVault} from "../src/StandaloneDaiVault.sol";

/**
 * @title DeploySuite
 * @notice Automated deployment pipeline for multi-chain network architecture components
 */
contract DeploySuite is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Canonical Ethereum Mainnet DAI Token Checksummed Address
        address targetDaiAddress = 0x6B175474E89094C44Da98b954EedeAC495271d0F; 
        uint256 reserveFloor = 500 ether;
        uint256 refillWeight = 100 ether;

        vm.startBroadcast(deployerPrivateKey);

        WillstoneNexusMaster master = new WillstoneNexusMaster();
        SovereignBridgeGateway gateway = new SovereignBridgeGateway();
        StandaloneDaiVault vault = new StandaloneDaiVault(targetDaiAddress, reserveFloor, refillWeight);

        console.log("WillstoneNexusMaster Deployed to:", address(master));
        console.log("SovereignBridgeGateway Deployed to:", address(gateway));
        console.log("StandaloneDaiVault Deployed to:", address(vault));

        vm.stopBroadcast();
    }
}
