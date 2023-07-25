const { express, ethers, app, abi, cors, contractAddress, network} = require('../imports.js')
const { connectDB } = require('../database/connect')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())

const validateParams = (req, res, next) => {
    if (!req.body.address) res.status(400).json({error: "Missing parameter - Address"})
 
    else if (!ethers.utils.isAddress(req.body.address)) res.status(400).json({error: "Invalid parameters - Address not found"})

    else if (!req.body.product_name) res.status(400).json({error: "Missing parameter - Product Name"})

    else if (!req.body.base_price) res.status(400).json({error: "Missing parameter - Base Price"})

    else if (!req.body.auction_time) res.status(400).json({error: "Missing parameter - Auction Time"})

    else if (req.body.auction_time < 100) res.status(400).json({error: "Invalid parameter - Auction Time too small"})

    else if (!req.body.description) res.status(400).json({error: "Missing parameter - Description"});

    else if (!req.body.images) res.status(400).json({error: "Missing parameter - Images"});

    else next()
}

const addToContract = async (req, res, next) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        const _auction_id = `${req.body.product_name}_${req.body.address}`
        const tx = await contract.populateTransaction.createAuction(_auction_id, req.body.product_name, req.body.base_price, req.body.auction_time)
        res.status(200).json({
            tx: tx,
        })        

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
}

const addToDB = async (req, res, next) => {
    try {
        const Auction = require('../database/auctionSchema')
        const _auction_id = `${req.body.product_name}_${req.body.address}`
        const auction = new Auction({
            auction_id: _auction_id,
            product_name: req.body.product_name,
            base_price: req.body.base_price,
            description: req.body.description,
            images: req.body.images.split(", ")
        })
        await auction.save()
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
}

const verifyTransaction = async (req, res, next) => {
    const tx_hash = req.body.tx
    if (!tx_hash) res.status(400).json({error: "Missing transaction hash"})

    const provider = new ethers.providers.JsonRpcProvider(network)
    const reciept = await provider.getTransactionReceipt(tx_hash)
    if (!reciept) res.status(400).json({error: "Transaction not found"})
    else next()
}


router.post("/", validateParams, addToContract)

router.post("/mongo", validateParams, verifyTransaction, connectDB, addToDB, async (req, res) => {

    res.status(200).json({
        auction_details: req.body,
        message: "Auction created successfully!",
    })
})

module.exports = router