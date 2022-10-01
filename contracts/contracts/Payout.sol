// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./governance/SBT.sol";

contract Payout is ReentrancyGuard {
    bytes32 public immutable root;
    mapping(uint256 => bool) public claimed;

    SBT public immutable sbt;

    constructor(bytes32 _root, address _sbt) {
        root = _root;
        sbt = SBT(_sbt);
    }

    function claim(
        uint256 index,
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external nonReentrant {
        require(!claimed[index], "Already claimed.");

        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(
            MerkleProof.verify(merkleProof, root, node),
            "Invalid proof."
        );

        claimed[index] = true;

        sbt.safeMint(account); // mint sbt for future governance

        (bool success, ) = account.call{value: amount}("");
        require(success, "Transfer failed.");
    }

    receive() external payable {}
}