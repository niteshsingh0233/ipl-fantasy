const mongoose = require(`mongoose`)

async function mongoConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('user db connected')
    } catch (error) {
        console.log(error)
    }
} 

module.exports = mongoConnection