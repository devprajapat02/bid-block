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

    address owner;

    constructor () {
        owner = msg.sender;
    }

    struct product {
        string product_name;
        uint256 base_price;
    }

    struct bid {
        uint256 bid_value;
        uint256 bid_time;
        address payable bidder;
    }

    struct auction {
        string auction_id;
        uint256 internal_id;
        product listed_product;
        bool started;
        uint256 starting_time;
        uint256 auction_time;
        uint256 end_time;
        address payable owner;
        bid highest_bid;
        bid[] bids;
        bool ended;
    }

    mapping(string => mapping(address => uint256)) public withdrawals;

    mapping(string => auction) public auctions;

    string[] public auction_ids;
    uint256 live_count = 0;
    uint256 past_count = 0;

    // constants
    uint256 page_limit = 12;

    // events
    event RevertMessage(string _message);
    event AuctionAlreadyAdded(string _auction_id, address _owner, product _product);
    event AuctionStarted(string _auction_id, address _owner, product _product, uint256 _starting_time, uint256 _auction_time);
    
    // function to create an auction
    function createAuction (string memory _auction_id, string memory _product_name, uint256 _base_price, uint256 _starting_time, uint256 _auction_time) public {
        if (auctions[_auction_id].owner != address(0)) {
            emit AuctionAlreadyAdded(_auction_id, auctions[_auction_id].owner, auctions[_auction_id].listed_product);
            revert();
        }

        auctions[_auction_id].auction_id = _auction_id;
        auctions[_auction_id].internal_id = auction_ids.length;
        auctions[_auction_id].listed_product.product_name = _product_name;
        auctions[_auction_id].listed_product.base_price = _base_price * 10**15;
        auctions[_auction_id].started = false;
        auctions[_auction_id].starting_time = _starting_time;
        auctions[_auction_id].auction_time = _auction_time;
        auctions[_auction_id].owner = payable(msg.sender);
        bid memory empty_bid = bid(0, 0, payable (address(0)));
        auctions[_auction_id].highest_bid = empty_bid;
        auctions[_auction_id].ended = false;

        auction_ids.push(_auction_id);
    }

    function startAuction (string memory _auction_id) public {
        if ((auctions[_auction_id].owner != msg.sender && msg.sender != owner) || auctions[_auction_id].started == true) {
            revert();
        }

        auctions[_auction_id].started = true;
        auctions[_auction_id].starting_time = block.timestamp;
        auctions[_auction_id].end_time = block.timestamp + auctions[_auction_id].auction_time;
        
        auctions[auction_ids[live_count + past_count]].internal_id = auctions[_auction_id].internal_id;
        auction_ids[auctions[_auction_id].internal_id] = auction_ids[live_count + past_count];
        
        auctions[_auction_id].internal_id = live_count + past_count;
        auction_ids[live_count + past_count] = _auction_id;
        live_count += 1;

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

        if ((auctions[_auction_id].highest_bid.bid_value == 0 && bid_value < auctions[_auction_id].listed_product.base_price) || bid_value < auctions[_auction_id].highest_bid.bid_value) {
            emit RevertMessage("Bid value is less than the highest bid");
            revert();
        }

        if (auctions[_auction_id].highest_bid.bidder != address(0)) {
            withdrawals[_auction_id][auctions[_auction_id].highest_bid.bidder] += auctions[_auction_id].highest_bid.bid_value;
        }

        bid memory new_bid = bid(bid_value, block.timestamp, payable (msg.sender));
        auctions[_auction_id].highest_bid = new_bid;
        auctions[_auction_id].bids.push(new_bid);

    }

    function withdrawBid (string memory _auction_id) external {

        uint256 amount = withdrawals[_auction_id][msg.sender];
        if (auctions[_auction_id].highest_bid.bidder == msg.sender) {
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

    function endAuction (string calldata _auction_id) public {
        if ((auctions[_auction_id].owner != msg.sender && msg.sender != owner) || auctions[_auction_id].ended == true) {
            revert();
        }

        auctions[_auction_id].ended = true;
        auctions[_auction_id].internal_id = past_count;
        auctions[auction_ids[past_count]].internal_id = auctions[_auction_id].internal_id;

        auction_ids[auctions[_auction_id].internal_id] = auction_ids[past_count];
        auction_ids[past_count] = _auction_id;
        past_count += 1;
        live_count -= 1;

    }

    function approveProduct (string memory _auction_id) external {
        if (auctions[_auction_id].highest_bid.bidder != msg.sender) {
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

        auctions[_auction_id].owner.transfer(auctions[_auction_id].highest_bid.bid_value);
        // if (!payable(auctions[_auction_id].owner).send(auctions[_auction_id].highest_bid)) {
        //     emit RevertMessage("Owner Transfer failed");
        //     revert();
        // }
    }


    // utility functions
    function getAuctionDetails (string memory _auction_id) public view returns (auction memory) {
        
        return auctions[_auction_id];
    }

    function getAuctionIds () public view returns (string[] memory) {
        return auction_ids;
    }

    function getPastIds (uint256 page_id) public view returns (string[] memory) {
        string[] memory _ret = new string[] (page_limit);
        uint256 page_base = page_limit * page_id;

        for (uint256 id=0; id<page_limit; id++) {
            if (page_base + id >= past_count) break ;

            _ret[id] = auction_ids[page_base + id];
        }

        return _ret;
    }

    function getLiveIds (uint256 page_id) public view returns (string[] memory) {
        string[] memory _ret = new string[] (page_limit);
        uint256 page_base = page_limit * page_id;

        for (uint256 id=0; id<page_limit; id++) {
            if (page_base + id >= live_count) break ;
            
            _ret[id] = auction_ids[past_count + page_base + id];
        }

        return _ret;
    }

    function getUpcomingIds (uint256 page_id) public view returns (string[] memory) {
        string[] memory _ret = new string[] (page_limit);
        uint256 page_base = page_limit * page_id;

        for (uint256 id=0; id<page_limit; id++) {
            if (past_count + live_count + page_base + id >= auction_ids.length) break ;
            
            _ret[id] = auction_ids[past_count + live_count + page_base + id];
        }

        return _ret;
    }

    function getContractBalance () public view returns (uint256) {
        return address(this).balance;
    }

    
}