const mongoose = require('mongoose')
// const crypto = require('crypto')
// const uuidv1 = require('uuid')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true,
        maxlength: 50
    },
    role:{
        type:String,
        default: 'user'
    },
    email:{
        type:String,
        trim: true,
        required: true,
        unique: 50
    },
    phone:{
        type:String,
        trim: true,
        required: true,
        unique: 50
    },
    password:{
        type:String,
        required: true
    },
    spaceUsed:{
        type: Number,
        trim: true,
        default: 0
    },
    spaceLimit:{
        type: Number,
        trim: true,
        default: 500
    },
},
{timestamps:true}
)

module.exports = mongoose.model("User",userSchema)