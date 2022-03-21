const { devNull } = require("os")
const collegeModel= require("../models/collegeModel")

const createCollege = async function(req,res){
    try{
        let collegeData = req.body
        if(Object.keys(collegeData)==0 || collegeData == undefined || collegeData == null){
            return res.status(401).send({status:false,msg:"required college data"})
        }
        let name = collegeData.name
        if(!name){
            return res.status(400).send({status:false,msg:"required name"})

        }
        let fullName = collegeData.fullName
        if(!fullName){
            return res.status(400).send({status:false,msg:"required fullName of college"})
        }
        let link = collegeData.logoLink
        if(!link){
            return res.status(400).send({status:false,msg:"required logoLink"})
        }
        else{
            let collegeCreate = await collegeModel.create(collegeData)
            return res.status(201).send({status:true,data:collegeCreate})
        }

    }
    catch(err){
        return res.status(500).send({status:false,msg: err.message})
    }
}


module.exports ={
    createCollege:createCollege
}

