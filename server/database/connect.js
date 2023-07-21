const mongoose = require('mongoose')


const connectDB = async (req, res, next) => {
    try {
        const mongoURL = process.env.MONGO_URL

        if (mongoose.connection.readyState === 1) {
            if (next) next()
            return
        }

        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected")
        console.log(mongoURL)
        if (next) next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
    connectDB
}