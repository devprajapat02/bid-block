const express = require("express")
const ethers = require('ethers')
const app = express()
const { abi } = require('./abi.json')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const contractAddress = '0x0e4eE68d9Fd290B5151C2663504aeF9093954714'
const network = "http://127.0.0.1:7545"

app.post("/", async (req, res) => {

    try {
        console.log(req.body)
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/")
        const contract = await new ethers.Contract("0x32e2F17ef39636432c22A2dFb41C734402D2db77", abi, provider)
        const tx = await contract.populateTransaction.mint(5)
        console.log(tx)
        res.json(
            {tx: tx}
        )

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


app.post("/createAuction", async (req, res) => {
    // console.log(req.params)
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        const _auction_id = `${req.body.product_name}_${req.body.address}`
        await contract.createAuction(_auction_id, req.body.product_name, req.body.base_price, req.body.auction_time)
        const auction_details = await contract.getAuctionDetails(_auction_id)
        res.json(auction_details)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post("/startAuction", async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)
        await contract.startAuction(req.body.auction_id)
        const auction_details = await contract.getAuctionDetails(req.body.auction_id)
        res.json(auction_details)
    } catch (error) {
        res.send(error)
    }
})

app.post("/makeBid", async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        await contract.makeBid(req.body.auction_id, {from: req.body.address, value: ethers.BigNumber.from(req.body.bid_value).mul(ethers.BigNumber.from(10).pow(15))})
        res.send("Bid made")
    } catch (error) {
        res.send(error)
    }
})

app.post("/withdrawBid", async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        contract.withdrawBid(req.body.auction_id, {from: req.body.address})
        res.send("Bid withdrawn")
    } catch (error) {
        res.send(error)
    }
})

app.get("/auctions", async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        //const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, provider)

        const auctions = await contract.auctions("")
        res.send(auctions)
    } catch (error) {
        res.send(error)
    }
})

app.get("/auctionDetails", async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        // const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, provider)

        const auction_details = await contract.getAuctionDetails(req.query.auction_id)
        res.send(auction_details)
    } catch (error) {
        res.send(error)
    }
})


app.listen(5000, () => {
    console.log("Server running on port 5000")
})

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