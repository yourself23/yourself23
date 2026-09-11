// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IERC20} from "./interfaces/IERC20.sol";

/**
 * @title StandaloneDaiVault
 * @notice Self-healing reserve replenishment engine isolating Vercel UI wallet connections
 */
contract StandaloneDaiVault {

    IERC20 public immutable DAI_TOKEN;
    address public immutable MANAGER;

    address public beneficiary;            
    uint256 public replenishmentThreshold; 
    uint256 public replenishmentAmount;    
    bool public isReplenishmentActive;

    event VaultReplenished(address indexed target, uint256 totalRefilled, uint256 timestamp);
    event BoundaryUpdated(uint256 structuralFloor, uint256 replenishmentWeight);
    event BeneficiaryMigrated(address indexed previousBeneficiary, address indexed newBeneficiary);
    event StatusToggled(bool activeState);

    error GuardUnauthorized();
    error ReserveThresholdNotMet();
    error InsufficientVaultLiquidity();
    error CircuitBreakerActive();
    error InvalidZeroAddress();
    error NativeRescueFailed();

    modifier onlyManager() {
        _checkManager();
        _;
    }

    constructor(address _tokenAddress, uint256 _initialThreshold, uint256 _initialAmount) {
        if (_tokenAddress == address(0)) revert InvalidZeroAddress();
        DAI_TOKEN = IERC20(_tokenAddress);
        MANAGER = msg.sender;

        beneficiary = address(this);
        replenishmentThreshold = _initialThreshold;
        replenishmentAmount = _initialAmount;
        isReplenishmentActive = true;
    }

    function _checkManager() internal view {
        if (msg.sender != MANAGER) revert GuardUnauthorized();
    }

    function executeAutoReplenish() external returns (bool) {
        if (!isReplenishmentActive) revert CircuitBreakerActive();

        uint256 currentBalance = DAI_TOKEN.balanceOf(beneficiary);
        if (currentBalance >= replenishmentThreshold) revert ReserveThresholdNotMet();

        uint256 vaultLiquidity = DAI_TOKEN.balanceOf(address(this));
        if (vaultLiquidity < replenishmentAmount) revert InsufficientVaultLiquidity();

        emit VaultReplenished(beneficiary, replenishmentAmount, block.timestamp);
        return true;
    }

    function configureBoundaries(uint256 _newFloor, uint256 _newWeight) external onlyManager {
        replenishmentThreshold = _newFloor;
        replenishmentAmount = _newWeight;
        emit BoundaryUpdated(_newFloor, _newWeight);
    }

    function setBeneficiary(address _newBeneficiary) external onlyManager {
        if (_newBeneficiary == address(0)) revert InvalidZeroAddress();
        emit BeneficiaryMigrated(beneficiary, _newBeneficiary);
        beneficiary = _newBeneficiary;
    }

    function toggleReplenishment(bool _state) external onlyManager {
        isReplenishmentActive = _state;
        emit StatusToggled(_state);
    }

    function rescueNativeFunds() external onlyManager {
        uint256 totalAssetWeight = address(this).balance;
        if (totalAssetWeight != 0) {
            (bool success, ) = MANAGER.call{value: totalAssetWeight}("");
            if (!success) revert NativeRescueFailed();
        }
    }
}
