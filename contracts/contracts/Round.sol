pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Round is Ownable {
    //  Start of donations, grants should be registered before startTime
    uint256 public immutable startTime;
    uint256 public immutable endTime;

    struct Grant {
        uint16 id;
        address owner;
        uint48 createdAt; // timestamp the grant was created, uint48 max-> year 8.7 million or so
        uint48 lastUpdated; // timestamp the grant data was last updated
        address payee; // address that receives funds donated to this grant
        string ipfsURL;
        uint256 totalDonation;
    }

    //  to keep ids 
    uint16 public grantCount;

    //  id -> grant
    mapping(uint16 => Grant) public grants;
    //  id -> donations
    mapping(uint16 => uint256[]) public grantDonations;


    //  EVENTS
    event GrantRegistration(address owner, address payee, string ipfsURL);
    event Donation(address donator, uint256 amount);
    event Payout(address payoutCtc, uint256 amount);


    //  MODIFIERS

    modifier beforeRoundStart() {
        require(block.timestamp < startTime, "Round already started!");
        _;
    }

    modifier onlyGrantOwner(uint16 _id) {
        require(grants[_id].owner == msg.sender, "Not authorized!");
        _;
    }

    constructor(uint256 _startTime, uint256 _endTime) {
        startTime = _startTime;
        endTime = _endTime;
    }


    //  GRANT FUNCTIONS

    function registerGrant(address _payee, string memory _ipfsURL) public beforeRoundStart() {
        grants[grantCount] = Grant(grantCount, msg.sender, uint48(block.timestamp), uint48(block.timestamp), _payee, _ipfsURL, 0);
        ++grantCount;

        emit GrantRegistration(msg.sender, _payee, _ipfsURL);
    }
    
    function updateGrantOwner(uint16 _id, address _newOwner) public beforeRoundStart onlyGrantOwner(_id) {
        Grant storage grant = grants[_id];
        grant.owner = _newOwner;
        grant.lastUpdated = uint48(block.timestamp);
    }

    function updateGrantPayee(uint16 _id, address _newPayee) public beforeRoundStart onlyGrantOwner(_id){
        Grant storage grant = grants[_id];
        grant.payee = _newPayee;
        grant.lastUpdated = uint48(block.timestamp);
    }

    function updateGrantIPFSURL(uint16 _id, string memory _newURL) public beforeRoundStart onlyGrantOwner(_id){
        Grant storage grant = grants[_id];
        grant.ipfsURL = _newURL;
        grant.lastUpdated = uint48(block.timestamp);
    }

    function donate(uint16 _id) public payable{
        require(startTime <= block.timestamp, "Round hasn't started yet!");
        require(block.timestamp < endTime, "Round ended!");

        Grant storage grant = grants[_id]
        require(grant.id == _id, "Grant does not exist!");

        grantDonations[_id].push(msg.value);
        grant.totalDonation += msg.value;

        emit Donation(msg.sender, msg.value);
    }

    function payout(address payable _payoutAddress) public onlyOwner {
        require(endTime < block.timestamp, "Round hasn't end yet!");

        _payoutAddress.transfer(address(this).balance);

        emit Payout(_payoutAddress, address(this).balance);
    }

    
    //  SYSTEM HELPERS

    //  To be used in the UI
    function getAllGrants() public view returns(Grant[] memory) {
        Grant[] memory grantList = new Grant[](grantCount);
        for (uint16 i = 0; i < grantCount; i++) {
            grantList[i] = grants[i];
        }
        return grantList;
    }

    //  To be used in the quadratic funding calc.
    function getGrantDonationAmounts(uint16 _id) public view returns(uint256[] memory) {
        return grantDonations[_id];
    }
}
