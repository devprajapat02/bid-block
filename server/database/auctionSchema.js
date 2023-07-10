const { mongoose } = require('../imports')

const auctionSechema = new mongoose.Schema({
    auction_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    base_price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model('Auction', auctionSechema)