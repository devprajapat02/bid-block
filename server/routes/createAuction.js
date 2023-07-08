const { express, ethers, app, abi, cors, contractAddress, network} = require('../imports.js')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())

const validateParams = (req, res, next) => {
    if (!req.body.address) res.status(400).json({error: "Missing parameter - Address"})

    let isValid = ethers.utils.isAddress(req.body.address)
    if (!isValid) res.status(400).json({error: "Invalid parameters - Address not found"})

    if (!req.body.product_name) res.status(400).json({error: "Missing parameter - Product Name"})

    if (!req.body.base_price) res.status(400).json({error: "Missing parameter - Base Price"})

    if (!req.body.auction_time) res.status(400).json({error: "Missing parameter - Auction Time"})

    if (req.body.auction_time < 100) res.status(400).json({error: "Invalid parameter - Auction Time too small"})

    next()
}



router.post("/", validateParams, async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        const _auction_id = `${req.body.product_name}_${req.body.address}`
        await contract.createAuction(_auction_id, req.body.product_name, req.body.base_price, req.body.auction_time)
        const auction_details = await contract.getAuctionDetails(_auction_id)
        res.status(200).json({
            auction_details: auction_details,
            message: "Auction created successfully!",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
})


module.exports = router