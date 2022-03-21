const internModel = require('../models/internModel')
const ObjectId = require('mongoose').Types.ObjectId
const validator = require('email-validator')



const createIntern = async function (req, res) {
    try {
        let internData = req.body;
        let email = internData.email
        let data = Object.keys(internData)
        if (data == 0 || data == undefined || data == null) {
            return res.status(400).send({ status: false, msg: "Please Enter the details of Intern" })
        }
        if (!internData.name.trim()) {
            return res.status(400).send({ status: false, msg: "Please Enter the name" })
        }
        

        if (validator.validate(email)) {
            let internData = await internModel.create(internData)
            return res.status(201).send({ status: false, data: internData })
        }
        else {
            res.status(400).send({ status: false, msg: "invalid email" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.export = {
    createIntern:createIntern
}