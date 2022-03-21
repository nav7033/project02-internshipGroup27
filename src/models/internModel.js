const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email :{
        type:String,
        required : true,
        trim: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: 'Please fill a valid email address',
            isAsync: false
        }
    },
    mobile: {
        type: String,
        required:true,
        minlength:10,
        maxlength:12,
        pattern:"^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
        unique : true,
    },
    collegeId : {
        type : ObjectId,
        ref : 'colleges'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
{ timestamps: true }
);
module.exports = mongoose.model('intern', internSchema)


