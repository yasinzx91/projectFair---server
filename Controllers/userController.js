//logic to resolve the request
//import modal 
const users = require('../Modals/userSchema')

//import    jwt

const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    console.log('Inside the user controller file');

    //extract data from request body
    const {username,email,password} = req.body;

    try{const existsUser = await users.findOne({email})
    if(existsUser){
        res.status(406).json("User already exists")
    }
    else{
        //create an object for the modal 
        const newUser = new users({
            username,   
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
        })
        
        //save the function in mongoose - to permenanly store this data in mongodb
        await newUser.save()
        //respone
        res.status(200).json(newUser)
    }}
    catch(err){
        console.log(`Reg failed due to ${err}`);
    }
}

//login for login 

exports.login = async(req,res)=>{
    const{email,password} = req.body;

    try{
            const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){

        const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")

        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(406).json("Incorrect email or password")
    }}
    catch(err){
        res.status(400).json(`Login failed due to ${err}`)
    }
}