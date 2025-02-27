const mongoose = require('mongoose')
const { randomUUID } = require("crypto");

const CDSSchema = new mongoose.Schema({
    documentCode : {
        type : String,
        default :  randomUUID().toString('hex')
    },
    cdsName : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    url : {
        type : String,
        trim : true,
        required : true,
    },
    method : {
        type : String,
        trim : true,
        required : true,
    },
    extraHeaders : [
        {
            headerName : {
                type : String,
                trim : true,
                required : true,
            },
            headerValue : {
                type : String,
                trim : true,
                required : true,
            }
        }
    ],
    queryParams :  [
        {
            paramKey : {
                type : String,
                trim : true,
                required : true,
            },
            paramValue : {
                type : String,
                trim : true,
                required : true,
            }
        }
    ],
    isDeleted : {
        type : Boolean,
        default : false
    },
    


}, {timestamps : true})

//const userdb = mongoose.connection.useDb('userdb');
module.exports = mongoose.model('cds', CDSSchema)