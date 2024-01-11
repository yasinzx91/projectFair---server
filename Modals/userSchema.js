//import mongoose

const mongoose = require('mongoose');
const validator = require('validator')



//create schema 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min : [3 , "Enter atleast 3 values"]
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})


const users = mongoose.model("users",userSchema)

//export users
module.exports = users