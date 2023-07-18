// const express = require("express")
// const ethers = require('ethers')
// const app = express()
// const { abi } = require('./abi.json')
// const cors = require('cors')
// const fs = require('fs')
// const createAuctionRouter = require("./routes/createAuction")

const {express, ethers, abi, cors, fs, mongoose, dotenv, contractAddress, network, bodyparser} = require('./imports')
const { connectDB } = require('./database/connect')
const app = express()

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
});

fs.readdirSync('./routes').forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`)
        const routeName = file.split('.')[0]
        app.use(`/${routeName}`, route)
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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

app.get('/connect', async (req, res) => {
    try {
        await connectDB()
      } catch (e) {
        console.log(e);
      }
})

// app.use('/createAuction1', createAuctionRouter)
app.post("/createAuction1", async (req, res) => {
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

app.post("/startAuction1", async (req, res) => {
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

app.post("/makeBid1", async (req, res) => {
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

app.post("/withdrawBid1", async (req, res) => {
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

        const auctions = await contract.getAuctionIds()
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