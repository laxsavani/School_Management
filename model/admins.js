const mongoose = require('mongoose')
const adminSchema =new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    pass:{
        type: String
    },
    img:{
        type: String
    },
    imgId:{
        type: String
    }
})

module.exports=mongoose.model('admins',adminSchema);