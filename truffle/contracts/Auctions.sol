// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";

/*
1. Owner lists the product
2. Owner begins the auction
3. Bidders bid on the product
    a. Bidders can see the current highest bid, previous bids
    b. Bidder bids with money on top of her previous bid
        i. Bid validation (value, time, current highest bid)
        ii. Previous highest bidder withdraw enabled
    c. Bidder can withdraw her bid (if she is not the highest bidder)
4. Auction time ends
5. Winner approves the product and then the contract pays the owner
6. Unsuccesful bids can still be withdrawn
*/

contract Auction {

    struct product {
        string product_name;
        uint256 base_price;
    }

    struct auction {
        string auction_id;
        product listed_product;
        bool started;
        uint256 auction_time;
        uint256 end_time;
        address payable owner;
        uint256 highest_bid;
        address payable highest_bidder;
        bool ended;
    }

    mapping(string => mapping(address => uint256)) public withdrawals;

    mapping(string => auction) public auctions;

    // events
    event RevertMessage(string _message);
    event AuctionAlreadyAdded(string _auction_id, address _owner, product _product);
    event AuctionStarted(string _auction_id, address _owner, product _product, uint256 _starting_time, uint256 _auction_time);
    
    // function to create an auction
    function createAuction (string memory _auction_id, string memory _product_name, uint256 _base_price, uint256 _auction_time) public {
        if (auctions[_auction_id].owner != address(0)) {
            emit AuctionAlreadyAdded(_auction_id, auctions[_auction_id].owner, auctions[_auction_id].listed_product);
            revert();
        }

        auctions[_auction_id].auction_id = _auction_id;
        auctions[_auction_id].listed_product.product_name = _product_name;
        auctions[_auction_id].listed_product.base_price = _base_price * 10**15;
        auctions[_auction_id].started = false;
        auctions[_auction_id].auction_time = _auction_time;
        auctions[_auction_id].owner = payable(msg.sender);
        auctions[_auction_id].highest_bid = 0;
        auctions[_auction_id].highest_bidder = payable(address(0));
        auctions[_auction_id].ended = false;
    }

    function startAuction (string memory _auction_id) public {
        if (auctions[_auction_id].owner != msg.sender || auctions[_auction_id].started == true) {
            revert();
        }

        auctions[_auction_id].started = true;
        auctions[_auction_id].end_time = block.timestamp + auctions[_auction_id].auction_time;

        emit AuctionStarted(_auction_id, auctions[_auction_id].owner, auctions[_auction_id].listed_product, block.timestamp, auctions[_auction_id].auction_time);
    }

    function makeBid (string memory _auction_id) external payable {

        if (block.timestamp > auctions[_auction_id].end_time) {
            auctions[_auction_id].ended = true;
        }

        if (auctions[_auction_id].started == false || auctions[_auction_id].ended == true) {
            emit RevertMessage("Auction not started or already ended");
            revert();
        }

        uint256 bid_value = msg.value + withdrawals[_auction_id][msg.sender];

        if ((auctions[_auction_id].highest_bid == 0 && bid_value < auctions[_auction_id].listed_product.base_price) || bid_value < auctions[_auction_id].highest_bid) {
            emit RevertMessage("Bid value is less than the highest bid");
            revert();
        }

        if (auctions[_auction_id].highest_bidder != address(0)) {
            withdrawals[_auction_id][auctions[_auction_id].highest_bidder] += auctions[_auction_id].highest_bid;
        }

        auctions[_auction_id].highest_bidder = payable(msg.sender);
        auctions[_auction_id].highest_bid = bid_value;
    }

    function withdrawBid (string memory _auction_id) external {

        uint256 amount = withdrawals[_auction_id][msg.sender];
        if (auctions[_auction_id].highest_bidder == msg.sender) {
            revert();
        }

        if (amount == 0) {
            revert();
        }

        withdrawals[_auction_id][msg.sender] = 0;
        if (!payable(msg.sender).send(amount)) {
            withdrawals[_auction_id][msg.sender] = amount;
        }
    }

    function approveProduct (string memory _auction_id) external {
        if (auctions[_auction_id].highest_bidder != msg.sender) {
            emit RevertMessage("You are not the highest bidder");
            revert();
        }

        if (block.timestamp > auctions[_auction_id].end_time) {
            emit RevertMessage("Auction has ended");
            auctions[_auction_id].ended = true;
        }

        if (auctions[_auction_id].ended == false) {
            emit RevertMessage("Auction has not ended");
            revert();
        }

        auctions[_auction_id].owner.transfer(auctions[_auction_id].highest_bid);
        // if (!payable(auctions[_auction_id].owner).send(auctions[_auction_id].highest_bid)) {
        //     emit RevertMessage("Owner Transfer failed");
        //     revert();
        // }
    }


    // utility functions
    function getAuctionDetails (string memory _auction_id) public view returns (auction memory) {
        
        return auctions[_auction_id];
    }

    function getContractBalance () public view returns (uint256) {
        return address(this).balance;
    }

    
}