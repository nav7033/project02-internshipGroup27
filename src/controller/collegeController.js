
const collegeModel = require("../models/collegeModel")

const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}


//=========create college============
const createCollege = async function (req, res) {
    try {
        // validate body request
        let collegeData = req.body
        if (Object.keys(collegeData) == 0 || collegeData == undefined || collegeData == null) {
            return res.status(400).send({ status: false, msg: "required college data" })
        }
        // validate name

        if (!isValid(collegeData.name)) {
            return res.status(400).send({ status: false, msg: "required name" })

        }
        // validate fullName

        if (!isValid(collegeData.fullName)) {
            return res.status(400).send({ status: false, msg: "required fullName of college" })
        }
        // validate link

        if (!isValid(collegeData.logoLink)) {
            return res.status(400).send({ status: false, msg: "required logoLink" })
        }
        if (!/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(collegeData.logoLink)) {
            return res.status(400).send({ status: false, msg: "please enter valid link" })

        }

        //checking duplicate entries of college
        let duplicateData = await collegeModel.findOne({ name: collegeData.name })
        if (duplicateData) {
            return res.status(400).send({ status: false, msg: "college with this name is already present" })
        }
        //finally create a collegeModel

        let collegeCreate = await collegeModel.create(collegeData)
        let result = {
            name:collegeCreate.name,
            fullName:collegeCreate.fullName,
            logoLink:collegeCreate.logoLink,
            isDeleted:collegeCreate.isDeleted
        }
        return res.status(201).send({ status: true, data: result })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {
    createCollege: createCollege
}

