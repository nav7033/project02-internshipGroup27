const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const collegeSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
        
    },
    fullName:{
        type:String,
        required:true
    },
    logoLink:{
       type:String,
       required:true 

    },
    isDeleted:{
        type:boolean,
        default:false
    }

},{timestamps:true})
module.exports = mongoose.model('college', collegeSchema)
