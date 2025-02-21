const mongoose = require('mongoose')
const { randomUUID } = require("crypto");

const UserSchema = new mongoose.Schema({
    documentCode : {
        type : String,
        default :  randomUUID().toString('hex')
    },
    name : {
        type : String,
        trim : true,
        required : true
    },
    userName : {
        type : String,
        trim : true,
        unique : true,
        required : true,
        lowercase : true
    },
    emailId : {
        type : String,
        trim : true,
        required : true,
        unique : true,
    },
    phone : {
        type : String,
        trim : true,
        length : 10,
        required : true
    },
    activities : [
        {
            type : String,
            trim : true
        }
    ],
    isDeleted : {
        type : Boolean,
        default : false
    },
    isDeactivated : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    userRole: {
        type: String,
        default: "User",
        enum : ["User", "Admin"]
    },
    password : {
        type : String,
        trim : true,
        minLength : 8,
        maxLength : 100,
        required : true
    },
    currentPassword : {
        type : String,
        trim : true,
        minLength : 8,
        maxLength : 100
    }


}, {timestamps : true})

//const userdb = mongoose.connection.useDb('userdb');
module.exports = mongoose.model('user', UserSchema)