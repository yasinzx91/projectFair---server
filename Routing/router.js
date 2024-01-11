
const express = require('express');

//import controller

const userController = require('../Controllers/userController');
const { addProject } = require('../Controllers/projectController');

//import project controller 

const projectController = require('../Controllers/projectController')
//create an object for router class in the express module 


//import jwtmware
const jwtMiddleWare = require('../MiddleWare/jwtMiddleWare')

//import multer 
const multerConfig = require("../MiddleWare/multerMiddleWare")

const router = new express.Router();


//export router

module.exports = router

//path to resolve the request 

    //syntax = router.httpReq('path',()=>{how to solve})

    //register 

    router.post('/user/register',userController.register)

    //login

    router.post('/user/login',userController.login)

    //add project

    router.post('/project/add',jwtMiddleWare,multerConfig.single("projectImage"),projectController.addProject)


    //get home project

    router.get('/project/home-project',projectController.getHomeProject);

    //get all project

    router.get('/project/all-project',jwtMiddleWare,projectController.getAllProject);

    //get user projects

    router.get('/project/user-projects',jwtMiddleWare,projectController.getUsersProject);

    //update 

    router.put('/project/edit/:id',jwtMiddleWare,multerConfig.single("projectImage"),projectController.editUserProjects)

    //delete project

    router.delete('/project/remove/:id',jwtMiddleWare,projectController.deleteUserProjects)

    module.exports = router