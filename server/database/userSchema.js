const { mongoose } = require('../imports')

const addressSchema = new mongoose.Schema({
    local: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
})

const bidSchema = new mongoose.Schema({
    timestamp:{
        type : String,
        required:true,
    },
    auction_id:{
        type : String,
        required:true,
    },
    bid_amount:{
        type : Number,
        required:true,
    }
})

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: addressSchema,
    },
    profileImage: {
        type: String,
    },
    auctions: [String],
    bid_history: [bidSchema],
})

module.exports = mongoose.model('User', userSchema)