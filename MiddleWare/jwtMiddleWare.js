

const jwt = require("jsonwebtoken")

const jwtMiddleWare = (req,res,next) =>{
    console.log("inside jwt middleware");
    const token = req.headers["authorization"].split(" ")[1];

    try{
        const jwtResponse = jwt.verify(token,"supersecretkey12345")
        req.payload = jwtResponse.userId;
        next()
    }catch(err){
        res.status(401).json("Autherization failed please login")
    }

    
}

module.exports = jwtMiddleWare