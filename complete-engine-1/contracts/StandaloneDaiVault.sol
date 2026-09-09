// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract StandaloneDaiVault {
    address public immutable daiToken;
    address public owner;
    uint256 public reserveTarget;
    uint256 public reserveThreshold;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event ReserveConfigUpdated(uint256 target, uint256 threshold);
    event ReserveReplenished(uint256 previousBalance, uint256 currentBalance);

    constructor(address _daiToken, uint256 _reserveTarget, uint256 _reserveThreshold) {
        require(_reserveThreshold <= _reserveTarget, "Invalid reserve config");
        daiToken = _daiToken;
        owner = msg.sender;
        reserveTarget = _reserveTarget;
        reserveThreshold = _reserveThreshold;
    }

    function setReserveConfig(uint256 _reserveTarget, uint256 _reserveThreshold) external {
        require(msg.sender == owner, "Only owner");
        require(_reserveThreshold <= _reserveTarget, "Invalid reserve config");
        reserveTarget = _reserveTarget;
        reserveThreshold = _reserveThreshold;
        emit ReserveConfigUpdated(_reserveTarget, _reserveThreshold);
    }

    function reserveBalance() public view returns (uint256) {
        return IERC20(daiToken).balanceOf(address(this));
    }

    function needsReplenishment() public view returns (bool) {
        return reserveBalance() < reserveThreshold;
    }

    function replenishReserve() external {
        uint256 currentBalance = reserveBalance();
        require(currentBalance >= reserveTarget, "Reserve target not funded");
        emit ReserveReplenished(currentBalance, currentBalance);
    }

    function deposit(uint256 amount) external {
        require(IERC20(daiToken).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        require(IERC20(daiToken).transfer(owner, amount), "Transfer failed");
        emit Withdraw(msg.sender, amount);
    }
}
