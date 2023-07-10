const mongoose = require('mongoose')


const connectDB = async (req, res, next) => {
    try {
        const mongoURL = process.env.MONGO_URL
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected")
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
    connectDB
}