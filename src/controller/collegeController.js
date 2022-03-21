const { devNull } = require("os")
const collegeModel= require("../models/collegeModel")



//=========create college============
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
        let url = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        if(!link){
            return res.status(400).send({status:false,msg:"required logoLink"})
        }
        if(url.test(link)){
            return res.status(404).send({status:false,msg:"invalid logoLink"})
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

