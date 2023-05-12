// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Auction {

    struct bid {
        address payable bidder_address;
        uint bid_amount;
        bool is_highest;
    }

    struct item {
        string item_id;
        uint base_price;
        address payable owner_address;
        uint[] duration;
        bool started;
        bid[] bid_list;
    }

    
    // item[] item_list;
    mapping (string => item) item_list;

    function add_item (string calldata item_id, uint base_price, address payable owner, uint[] calldata duration) public returns (bool) {
        
        if (item_list[item_id].base_price > 0) {
            return false;
        }

        item storage _item = item_list[item_id];
        _item.item_id = item_id;
        _item.base_price = base_price;
        _item.owner_address = owner;
        _item.duration = duration;
        _item.started = false;
        return true;
    }

    /*function time_left_to_end_bidding (string calldata item_id) public returns (uint[] memory) {
        item storage _item = item_list[item_id];
        require (_item.base_price > 0, "Can't find this product!");
    }*/

    function start_bid (string calldata item_id) public returns (bool) {
        require(msg.sender == item_list[item_id].owner_address, "This product does not belong to you!");
        require(!item_list[item_id].started, "The auction for this product has already been started!");

        item storage _item = item_list[item_id];
        _item.started = true;
        return true;
    }

    function place_bid (string calldata item_id, uint bid_amount) public returns (bool) {
        item storage _item = item_list[item_id];
        require (_item.base_price > 0, "Can't find this product!");
        require (_item.started == true, "The auction hasn't started yet");
        
        uint current_bid = _item.base_price;
        bool valid_bid = bid_amount >= current_bid;

        if (_item.bid_list.length > 0) {
            current_bid = _item.bid_list[_item.bid_list.length - 1].bid_amount;
            valid_bid = bid_amount >= current_bid + (_item.base_price / 10);
        }

        require (valid_bid, "Increase the bid by at least 10% the base price!");

        bool withdraw_sent;
        bool owner_sent;

        if (_item.bid_list.length > 0) {
            address payable previous_bidder;
            previous_bidder = _item.bid_list[_item.bid_list.length - 1].bidder_address;
            
            (withdraw_sent, ) = previous_bidder.call{value: current_bid}("");
            

            (owner_sent, ) = _item.owner_address.call{value: bid_amount - current_bid}("");
            require (owner_sent, "Transaction to owner failed!");

        } else {
            
            withdraw_sent = true;
            (owner_sent, ) = _item.owner_address.call{value: bid_amount}("");
        }

        require (withdraw_sent, "Withdrawl transaction to previous bidder failed!");
        require (owner_sent, "Transaction to owner failed!");

        _item.bid_list[_item.bid_list.length - 1].is_highest = false;

        bid storage new_bid = _item.bid_list.push();
        new_bid.bid_amount = bid_amount;
        new_bid.bidder_address = payable (msg.sender);
        new_bid.is_highest = true;

        return true;
    }

    
}