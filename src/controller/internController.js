const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const ObjectId = require('mongoose').Types.ObjectId

 
const isValid = function (value){
    if(typeof value == 'undefined'|| value ===null) return false
    if (typeof value == 'string' && value.trim().length ===0) return false
    return true
}



const createIntern = async function (req, res) {
    try {
        let internData = req.body;
    if(Object.keys(internData) == 0){
        return res.status(400).send({status:false, msg:"Please Enter the details of Intern"})
    }
    // name undefined
    if(!internData.name) return res.status(400).send({status:false, msg : " name is required"})
    
    if(internData.name.trim().length == 0){
        return res.status(400).send({status:false, msg:"Please Enter the name"})
    }
    if(!internData.collegeId){
        return req.status(400).send({status:false, msg:"Please enter College ID"})
    }
    
    if(!ObjectId.isValid(internData.collegeId)){
        return res.status(400).send({status:false,msg:"Invalid College ID"})
    }
    let college = await collegeModel.findById(internData.collegeId)
    if(!college) return res.status(400).send({status : false, msg : " No College found for the specific college ID"})
    // valid mobile number
    if(!(/^([+]\d{2})?\d{10}$/.test(internData.mobile))){
        return res.status(400).send({status:false,msg:"please enter valid mobile no."})
     }
    let dupMobile = await internModel.findOne({mobile : internData.mobile})

    if(dupMobile) return res.status(400).send({status:false,msg:"mobile number is already registered"})
    // valid email 
    if(!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(internData.email))){
        return res.status(400).send({status:false,msg:"email is not valid"})
    }
    let dupEmail = await internModel.findOne({email : internData.email})
    
    if(dupEmail) return res.status(400).send({status:false,msg:"email ID is already registered"})
    
    let savedData = await internModel.create(internData); 
    res.status(201).send({status:true, data : savedData})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// ========getCollegeData=====================
const getCollegeData= async function(req,res){

    try{
        let collegeName = req.query
    if(!collegeName){
        return res.status(400).send({status:false,msg:"collegeName required"})
    }
    let collegeData = await collegeModel.find({name:collegeName.name})
    if(collegeData.length == 0){
         return res.status(404).send({status:false,msg:"not found "})
    } 
    let interestedIntern = await internModel.find({collegeId:collegeData._id})
    let college = { 
        name:collegeData.name,
        fullName:collegeData.fullName , 
        logoLink:collegeData.logoLink

    }
    if(interestedIntern.length>0){
        college['interests'] = interestedIntern
        return res.send(200).send({status:true,data:college})
    }
    if(interestedIntern.length ==0){
        college ['interest'] = "No intern apply now"
        return res.status(200).send({status:false,msg:college})
    }
    
    }
    catch(err){
        return res.status(500).send({status:false,msg: err.message})
    }
    
}

module.exports.createIntern = createIntern,
module.exports.getCollegeData = getCollegeData