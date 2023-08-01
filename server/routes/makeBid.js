const { express, ethers, abi, cors, contractAddress, network} = require('../imports.js')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())

const validateParams = async (req, res, next) => {
    if (!req.body.address) res.status(400).json({error: "Missing parameter - Address"})

    let isValid = ethers.utils.isAddress(req.body.address)
    if (!isValid) res.status(400).json({error: "Invalid parameters - Address not found"})
    
    else if (!req.body.bid_value) res.status(400).json({error: "Missing parameter - Bid value"})

    else if (!req.body.auction_id) res.status(400).json({error: "Missing parameter - Auction ID"})

    else next()
}

router.post('/', validateParams, async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)
        
        let bid_value = ethers.utils.parseEther(req.body.bid_value.toString())
        const bid_hex = ethers.utils.hexlify(bid_value)
        const tx = await contract.populateTransaction.makeBid(req.body.auction_id, {from: req.body.address, value: bid_hex})
        res.status(200).json({
            tx: tx
        })
    } catch (error) {
        res.status(400).json({error: error})
    }
})

const verifyTransaction = async (req, res, next) => {
    const tx_hash = req.body.tx
    if (!tx_hash) res.status(400).json({error: "Missing transaction hash"})

    const provider = new ethers.providers.JsonRpcProvider(network)
    const reciept = await provider.getTransactionReceipt(tx_hash)
    if (!reciept) res.status(400).json({error: "Transaction not found"})
    else {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const contract = await new ethers.Contract(contractAddress, abi, provider)
        const auction = await contract.getAuctionDetails(req.body.auction_id)
    
        if (auction.listed_product.product_name == '') res.status(400).json({error: "Invalid parameters - Auction not found"})
    
        else if (auction.ended) res.status(400).json({error: "Invalid parameters - Auction ended"})
    
        else if (auction.started == false) res.status(400).json({error: "Invalid parameters - Auction not started"})
    
        else if (auction.highest_bid.bidder == req.body.address) res.status(400).json({error: "Invalid parameters - You are already the highest bidder"})
    
        else next()
    }
}

router.post('/mongo', validateParams, verifyTransaction, async (req, res) => {
    res.json({
        message: "Bid placed successfully!",
        params: req.body
    })
})

module.exports = router