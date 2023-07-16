// getItems - done
// getItem
// updateItem

const { express, ethers, app, abi, cors, contractAddress, network, User} = require('../imports.js')
const Auction = require('../database/auctionSchema.js')
const { connectDB } = require('../database/connect.js')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())



// endpoints to fetch list of auction ids

router.get('/getItems', async (req, res) => {
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

router.get('/getItems/upcoming', async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        //const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, provider)
        
        const page_id = req.query.page_id>=0 ? req.query.page_id : 0
        const auctions = await contract.getUpcomingIds(page_id)
        res.send(auctions)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getItems/live', async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        //const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, provider)

        const page_id = req.query.page_id>=0 ? req.query.page_id : 0
        const auctions = await contract.getLiveIds(page_id)
        res.send(auctions)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getItems/past', async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        //const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, provider)

        const page_id = req.query.page_id>=0 ? req.query.page_id : 0
        const auctions = await contract.getPastIds(page_id)
        res.send(auctions)
    } catch (error) {
        res.send(error)
    }
})



// endpoint to fetch auction data

const fetchBlockData = async (auction_id) => {
    const provider = new ethers.providers.JsonRpcProvider(network)
    //const signer = await provider.getSigner(req.body.address)
    const contract = await new ethers.Contract(contractAddress, abi, provider)

    const auction = await contract.getAuctionDetails(auction_id)
    return auction
}

const fetchCentralData = async (auction_id) => {
    await connectDB()
    const auction = await Auction.findOne({auction_id: auction_id})
    return auction
}

router.get('/getItem', async (req, res) => {
    if (!req.query.auction_id) res.status(400).json({error: "Missing parameter - Auction ID"})
    else {
        try {
            const blockData = await fetchBlockData(req.query.auction_id)
            const centralData = await fetchCentralData(req.query.auction_id)
            const auction = {
                block_data: blockData,
                central_data: centralData
            }
            res.send(auction)
        } catch (error) {
            res.status(400).json({error: error})
        }
    }
})



// endpoint to update auction data

const validateParams = (req, res, next) => {

    if (!req.body.address) res.status(400).json({error: "Missing parameter - Address"})
 
    else if (!ethers.utils.isAddress(req.body.address)) res.status(400).json({error: "Invalid parameters - Address not found"})

    else if (!req.body.auction_id) res.status(400).json({error: "Missing parameter - Auction ID"})

    else if (!req.body.product_name && !req.body.description && !req.body.images) res.status(400).json({error: "Missing parameter - No data to update"})
    
    else next()
}

const updateCentralData = async (req, res, next) => {
    const auction = await Auction.findOne({auction_id: req.body.auction_id})
    if (!auction) res.status(400).json({error: "Auction not found"})
    else {
        if (req.body.product_name) auction.product_name = req.body.product_name
        if (req.body.description) auction.description = req.body.description
        if (req.body.images) auction.images = req.body.images
        await auction.save()
        next()
    }
}

// jwt authentication to be added
router.post('/updateItem', validateParams, connectDB, updateCentralData, async (req, res) => {
    res.status(200).json({message: "Auction data updated successfully"})
})

module.exports = router