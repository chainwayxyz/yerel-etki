// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./interfaces/NativeMinterInterface.sol";

contract NativeMinter {
    NativeMinterInterface public nativeMinter;
    uint256 mintAmount;

    constructor(address _nativeMinter, uint256 _mintAmount) {
        nativeMinter = NativeMinterInterface(_nativeMinter);
        mintAmount = _mintAmount;
    }

    function mintNativeCoin(address addr) public {
        nativeMinter.mintNativeCoin(addr, mintAmount);
    }
}