const { express, ethers, abi, cors, contractAddress, network} = require('../imports.js')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors())

const validateParams = (req, res, next) => {
    if (!req.body.address) res.status(400).json({error: "Missing parameter - Address"})

    let isValid = ethers.utils.isAddress(req.body.address)
    if (!isValid) res.status(400).json({error: "Invalid parameters - Address not found"})

    if (!req.body.auction_id) res.status(400).json({error: "Missing parameter - Auction ID"})

    if (!req.body.bid_value) res.status(400).json({error: "Missing parameter - Bid value"})

    next()
}

router.post('/', validateParams, async (req, res) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        await contract.makeBid(req.body.auction_id, {from: req.body.address, value: ethers.BigNumber.from(req.body.bid_value).mul(ethers.BigNumber.from(10).pow(15))})
        res.status(200).json({message: "Bid made"})
    } catch (error) {
        res.status(400).json({error: error})
    }
})

module.exports = router