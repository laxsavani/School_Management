const mongoose = require('mongoose')
const payFees =new mongoose.Schema({
    studentId:{
        type:String,
    },
    payment:{
        type:String,
    },
    date:{
        type:String,
    },
    amount:{
        type:String,
    }
})

module.exports=mongoose.model('payFees',payFees);