const mongoose = require('mongoose')
const student =new mongoose.Schema({
    name:{
        type: String
    },
    semail:{
        type: String
    },
    smobile:{
        type: String
    },
    course:{
        type: String
    },
    fees:{
        type: String
    },
    time:{
        type: String
    },
    date:{
        type: String
    },
    gender:{
        type: String
    },
    img:{
        type: String
    },
    imgId:{
        type: String
    },
    pmobile:{
        type: String
    },
    pemail:{
        type: String
    },
    psss:{
        type: String
    }
})

module.exports=mongoose.model('student',student);