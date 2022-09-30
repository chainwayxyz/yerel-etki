pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoundContract is Ownable {
    //  Start of donations, grants should be registered before startTime
    uint256 public immutable startTime;
    uint256 public immutable endTime;
    IERC20 public immutable donationToken;
    address payoutContractAddr; // maybe impl. interface

    struct Grant {
        uint16 id;
        address owner;
        uint48 createdAt; // timestamp the grant was created, uint48 max-> year 8.7 million or so
        uint48 lastUpdated; // timestamp the grant data was last updated
        address payee; // address that receives funds donated to this grant
        string ipfsURL;
    }

    //  to keep ids 
    uint16 public grantCount;

    //  id -> grant
    mapping(uint16 => Grant) public grants;
    //  id -> donations
    mapping(uint16 => uint256[]) public grantDonations;

    constructor(uint256 _startTime, uint256 _endTime, IERC20 _donationToken, address _payoutContractAddr) {
        startTime = _startTime;
        endTime = _endTime;
        donationToken = _donationToken;
        payoutContractAddr = _payoutContractAddr;
    }
}
