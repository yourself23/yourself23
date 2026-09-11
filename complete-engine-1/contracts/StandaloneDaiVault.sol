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

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(address _daiToken) {
        daiToken = _daiToken;
        owner = msg.sender;
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
