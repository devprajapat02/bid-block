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

    next()
}

router.post('/', validateParams, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5173');
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        const tx = await contract.populateTransaction.withdrawBid(req.body.auction_id, {from: req.body.address})
        res.status(201).json({
            message: "Withdrawing bid",
            tx: tx
        })
    } catch (error) {
        res.status(400).json({error: error})
    }
})

module.exports = router