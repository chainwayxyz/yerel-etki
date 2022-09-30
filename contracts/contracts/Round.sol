pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoundContract is Ownable {
    //  Start of donations, grants should be registered before startTime
    uint256 public immutable startTime;
    uint256 public immutable endTime;
    IERC20 public immutable donationToken;
    address payoutContractAddr; // maybe impl. interface

    constructor(uint256 _startTime, uint256 _endTime, IERC20 _donationToken, address _payoutContractAddr) {
        startTime = _startTime;
        endTime = _endTime;
        donationToken = _donationToken;
        payoutContractAddr = _payoutContractAddr;
    }
}
