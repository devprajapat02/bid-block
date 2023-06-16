const Auction = artifacts.require("Auction");
const ethers = require('ethers')

contract('Auction', (accounts) => {

    

    it("should demonstrate auctioning process", async() => {
        const instance = await Auction.deployed();
        
        // create a new auction
        const product_name = "iPhone 12";
        const _auction_id = `${product_name}_${accounts[0]}`
        await instance.createAuction(_auction_id, product_name, 2000, 10, {from: accounts[0]});

        // check if the auction is created
        let auction_details = await instance.getAuctionDetails(_auction_id)
        console.log(auction_details);
        assert.equal(auction_details.owner, accounts[0], "Auction creator is not correct");

        // start the auction
        await instance.startAuction(_auction_id, {from: accounts[0]});
        auction_details = await instance.getAuctionDetails(_auction_id)
        assert.equal(auction_details.started, true, "Auction is not started");

        // place a bid
        await instance.makeBid(_auction_id, {from: accounts[1], value: 2 * 10 ** 18});
        auction_details = await instance.getAuctionDetails(_auction_id)
        assert.equal(auction_details.highest_bidder, accounts[1], "Bidder is not correct");

        // place a higher bid
        await instance.makeBid(_auction_id, {from: accounts[2], value: 3 * 10 ** 18});
        auction_details = await instance.getAuctionDetails(_auction_id)
        assert.equal(auction_details.highest_bidder, accounts[2], "Bidder is not correct");

        await instance.makeBid(_auction_id, {from: accounts[1], value: 2 * 10 ** 18});
        auction_details = await instance.getAuctionDetails(_auction_id)
        let hightst_bid = auction_details.highest_bid.toString()
        console.log("Highest bid: ", hightst_bid)
        assert.equal(auction_details.highest_bidder, accounts[1], "Bidder is not correct");

        // wait for the auction to end
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        // approve Product by winner
        const contract_bal = await instance.getContractBalance()
        console.log("Contract balance: ", contract_bal.toString())

        const provider = new ethers.providers.WebSocketProvider('http://127.0.0.1:7545');
        const owner_bal0 = (await provider.getBalance(accounts[0])).toString()
        await instance.approveProduct(_auction_id, {from: accounts[1]})
        const owner_bal1 = (await provider.getBalance(accounts[0])).toString()
        console.log(owner_bal1, owner_bal0)

        // withdraw unsuccessful bids
        await instance.withdrawBid(_auction_id, {from: accounts[2]})
        auction_details = await instance.getAuctionDetails(_auction_id)
        console.log(auction_details)

        
    })

})