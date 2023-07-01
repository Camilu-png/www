const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://panquequeuser:asdqwe123@cluster0.55ruucc.mongodb.net/?retryWrites=true&w=majority');
    console.log("mongodb connected");
}

module.exports = { connectDB }

