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
    },
    images: {
        type: Array,
        required: true,
    },
    starting_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    highest_bid: {
        type: Number,
        default: 0,
    },
    
})

module.exports = mongoose.model('Auction', auctionSechema)