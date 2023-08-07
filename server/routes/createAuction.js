const { express, ethers, app, abi, cors, crypto, contractAddress, network, cron, checkAuth, cronTimer, auctionParser} = require('../imports.js')
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

    else if (!req.body.starting_time) res.status(400).json({error: "Missing parameter - Starting Time"})

    else if (!req.body.ending_time) res.status(400).json({error: "Missing parameter - Ending Time"})

    else if (!req.body.description) res.status(400).json({error: "Missing parameter - Description"});

    else if (!req.body.images) res.status(400).json({error: "Missing parameter - Images"});
    // else res.send("OK")
    else next()
}

const addToContract = async (req, res, next) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const signer = await provider.getSigner(req.body.address)
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        const _auction_id = crypto.SHA256(`${req.body.product_name}_${req.body.address}`).toString()
        const _starting_time = new Date(req.body.starting_time).getTime() / 1000
        const _auction_time = ( new Date(req.body.ending_time).getTime() - new Date(req.body.starting_time).getTime() ) / 1000
        // const tr = "powr"
        // cron.schedule(cronTimer(req.body.starting_time), () => {
        //     console.log("executed!!!!!!!!")
        //     console.log(tr, "executed!!!!!!!!")
        // }, {timezone: "Asia/Kolkata"})
        // res.send([_starting_time, _auction_time])
        // return;
        const tx = await contract.populateTransaction.createAuction(_auction_id, req.body.product_name, req.body.base_price, _auction_time, _starting_time)

        cron.schedule(cronTimer(req.body.starting_time), async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(network)
                const wallet = new ethers.Wallet(process.env.SERVER, provider)
                const contract = new ethers.Contract(contractAddress, abi, wallet)
                const auction = await contract.getAuctionDetails(_auction_id)

                console.log(auction)
                if (auction.listed_product.product_name == '') {
                    console.log(`Tried starting auction ${_auction_id} but it was not created!`)
                    return
                }
                if (auction.started) {
                    console.log(`Tried starting auction ${_auction_id} but it was already started!`)
                    return
                }

                const tx = await contract.startAuction(_auction_id)
                await tx.wait()
                console.log(`Auction: ${_auction_id} started on contract!`)
            } catch (e) {
                console.log(`Error while starting auction: ${_auction_id}`, e)
            }
        })

        cron.schedule(cronTimer(req.body.ending_time), async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(network)
                const wallet = new ethers.Wallet(process.env.SERVER, provider)
                const contract = new ethers.Contract(contractAddress, abi, wallet)
                const auction = await contract.getAuctionDetails(_auction_id)

                if (auction.listed_product.product_name == '') {
                    console.log(`Tried ending auction ${_auction_id} but it was not created!`)
                    return
                }
                if (!auction.started) {
                    console.log(`Tried ending auction ${_auction_id} but it was not started!`)
                    return
                }
                if (auction.ended) {
                    console.log(`Tried ending auction ${_auction_id} but it was already ended!`)
                    return
                }

                const tx = await contract.endAuction(_auction_id)
                await tx.wait()
                console.log(`Auction: ${_auction_id} ended on contract!`)
            } catch (e) {
                console.log(`Error while ending auction: ${_auction_id}`, e)
            }
        })

        res.status(200).json({
            auction_id: _auction_id,
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
        const User = require('../database/userSchema')
        console.log(req.body)
        const auction = new Auction({
            auction_id: req.body.auction_id,
            product_name: req.body.product_name,
            base_price: req.body.base_price,
            description: req.body.description,
            images: req.body.images.split(", "),
            starting_time: new Date(req.body.starting_time),
            end_time: new Date(req.body.ending_time),
        })
        await auction.save()

        // update user table in mongodb
        const user = await User.findOne({id: req.userData.userId})
        user.auctions.push(req.body.auction_id)
        await user.save()

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


router.post("/", checkAuth, validateParams, addToContract)

router.post("/mongo", checkAuth, validateParams, verifyTransaction, connectDB, addToDB, async (req, res) => {

    res.status(200).json({
        auction_details: req.body,
        message: "Auction created successfully!",
    })
})

router.get("/end", async (req, res) => {
    const _auction_id = req.query.auction_id
    try {
        const provider = new ethers.providers.JsonRpcProvider(network)
        const wallet = new ethers.Wallet(process.env.SERVER, provider)
        const contract = new ethers.Contract(contractAddress, abi, wallet)
        const auction = await contract.getAuctionDetails(_auction_id)
        console.log(auction)
        if (auction.listed_product.product_name == '') {
            console.log(`Tried ending auction ${_auction_id} but it was not created!`)
        }
        else if (!auction.started) {
            console.log(`Tried ending auction ${_auction_id} but it was not started!`)
        }
        else if (auction.ended) {
            console.log(`Tried ending auction ${_auction_id} but it was already ended! -> ${auction.ended}`)
        } else {
            await contract.endAuction(_auction_id)
            console.log(`Auction: ${_auction_id} ended on contract!`)
        }

        res.send(_auction_id)
    } catch (e) {
        console.log(`Error while ending auction: ${_auction_id}`, e)
        res.status(400).json({error: e})
    }
})

module.exports = router