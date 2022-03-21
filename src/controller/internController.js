const internModel = require('../models/internModel')
const ObjectId = require('mongoose').Types.ObjectId
const createIntern = async function(req,res){
    let internData = req.body;
    if(Object.keys(internData) == 0){
        return res.status(400).send({status:false, msg:"Please Enter the details of Intern"})
    }
    if(!internData.name.trim()){
        return res.status(400).send({status:false, msg:"Please Enter the name"})
    }
    if(!ObjectId.isValid(internData.collegeId)){
        return res.status(400).se
    }
}