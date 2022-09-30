pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MatchingFund is Ownable {
    //  No donations after payout
    bool public paidOut;

    event Payout(address payoutCtc, uint256 amount);
    event Donation(address donator, uint256 amount);

    constructor() {

    }

    function donate() public payable {
        require(!paidOut, "Pool already paid out!");
        emit Donation(msg.sender, msg.value);
    }

    function payout(address _payoutAddr) public  payable onlyOwner {
        _payoutAddr.transfer(address(this).balance);
        
        paidOut = true;

        emit Payout(_payoutAddr, address(this).balance);
    }
}