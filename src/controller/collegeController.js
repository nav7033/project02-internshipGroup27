
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
        // validate Fullname

        if (!isValid(collegeData.fullName)) {
            return res.status(400).send({ status: false, msg: "required fullName of college" })
        }
        // validate link

        let url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        if (!isValid(collegeData.logoLink)) {
            return res.status(400).send({ status: false, msg: "required logoLink" })
        }
        // if (!url.test(link)) {
        //     return res.status(404).send({ status: false, msg: "invalid logoLink" })
        // }
        //checking duplicate entries of college
        let duplicateData = await collegeModel.find({ name: collegeData.name.trim() })
        if (duplicateData) {
            return res.status(400).send({ status: false, msg: "college with this name is already present" })
        }
        //finally create a collegeModel

        let collegeCreate = await collegeModel.create(collegeData)
        return res.status(201).send({ status: true, data: collegeCreate })







    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {
    createCollege: createCollege
}

