const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        mongoose.connect(process.env.DATABASE)
        console.log('Connect mongoose DB')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;