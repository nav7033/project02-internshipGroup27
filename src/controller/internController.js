const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const ObjectId = require('mongoose').Types.ObjectId


const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}



const createIntern = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let internData = req.body;
        if (Object.keys(internData) == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter the details of Intern" })
        }
      
        if (!internData.name) return res.status(400).send({ status: false, msg: " name is required" })

        if (internData.name.trim().length == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter the name" })
        }
        if (!internData.collegeId) {
            return res.status(400).send({ status: false, msg: "Please enter College ID" })
        }

        if (!ObjectId.isValid(internData.collegeId)) {
            return res.status(400).send({ status: false, msg: "Invalid College ID" })
        }
        let college = await collegeModel.findOne({ name: internData.collegeName, isDeleted: false })
        if (!college) return res.status(400).send({ status: false, msg: " No College found for the specific college ID" })
        // valid mobile number
        if (!(/^[6-9]\d{9}$/.test(internData.mobile))) {
            return res.status(400).send({ status: false, msg: "please enter valid mobile no." })
        }
        let dupMobile = await internModel.findOne({ mobile: internData.mobile })

        if (dupMobile) return res.status(400).send({ status: false, msg: "mobile number is already registered" })
        // valid email 
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(internData.email.trim()))) {
            return res.status(400).send({ status: false, msg: "email is not valid" })
        }
        let dupEmail = await internModel.findOne({ email: internData.email })

        if (dupEmail) return res.status(400).send({ status: false, msg: "email ID is already registered" })

        let savedData = await internModel.create(internData);
        let result = {
            isDeleted: savedData.isDeleted,
            name: savedData.name,
            email: savedData.email,
            mobile: savedData.mobile,
            collegeId: savedData.collegeId
        }
        res.status(201).send({ status: true, data: result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// ========getCollegeData=====================
const getCollegeData = async function (req, res) {

    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let collegeName = req.query.collegeName
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "collegeName required" })
        }
        let collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeData) {
            return res.status(404).send({ status: false, msg: "not found " })
        }
        let result = {
            name: collegeData.name,
            fullName: collegeData.fullName,
            logoLink: collegeData.logoLink
        }
        let id = collegeData._id
        let interestedIntern = await internModel.find({ collegeId: id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
        if (interestedIntern.length == 0) {
            result['interest'] = "No intern applied till now"
            return res.status(200).send({ status: false, msg: result })
        }
        result.interest = interestedIntern
        return res.status(200).send({ status: true, data: result })

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports.createIntern = createIntern,
module.exports.getCollegeData = getCollegeData