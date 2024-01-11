//1) import .env

require('dotenv').config()

//2)import express

const express = require('express')

//3)import cors

const cors = require('cors')

//import router

const router = require('./Routing/router')

//imort multer




//import connection.js

require('./DB/connection');

//4)create server 

const pfServer = express()

//5)use of cors by server 

pfServer.use(cors())

//6)parsing json 

pfServer.use(express.json())

//use router

pfServer.use(router)

//pfserver use upload folder
//first arg - how other application use folder 
//second arg - to export that particular folder - express.static

pfServer.use('/uploads',express.static('./Uploads'))


//7)customize port - by default server runs at 3000

const PORT = 4000 || process.env

//8)run server 

pfServer.listen(PORT,()=>{
    console.log('Server Running....');
})

//9)get request 

pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">Server is running successfully...</h1>`)
})

//10)post request

pfServer.post('/',(req,res)=>{
    res.send(`post request`)
})