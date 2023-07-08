const { express, ethers, app, abi, cors, contractAddress, network} = require('../imports.js')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())

const validateParams = (req, res, next) => {
    if (!req.body.address) res.status(400).json({error: "Missing parameter - Address"})

    let isValid = ethers.utils.isAddress(req.body.address)
    if (!isValid) res.status(400).json({error: "Invalid parameters - Address not found"})

    if (!req.body.auction_id) res.status(400).json({error: "Missing parameter - Auction ID"})

    next()
}

router.post("/", validateParams, async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)
        await contract.startAuction(req.body.auction_id)
        const auction_details = await contract.getAuctionDetails(req.body.auction_id)
        res.json({
            auction: auction_details,
            message: "Auction started successfully"
        })
    } catch (error) {
        res.status(400).json({error: error})
    }
})

module.exports = router