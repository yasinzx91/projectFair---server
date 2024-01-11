
const { $CombinedState } = require("@reduxjs/toolkit");
const projects = require("../Modals/projectSchema");
const project = require("../Modals/projectSchema");
const users = require("../Modals/userSchema");

exports.addProject =async(req,res)=>{
    console.log("Inside the project Controller");
    const userId = req.payload;
    console.log(userId);
    console.log(req)

    const projectImage = req.file.filename;
  

    console.log(projectImage)

    const {title,language,github,website,overview} = req.body;
   
    try{
            const exsitingProject = await project.findOne({github})

        if(exsitingProject){
            res.status(406).json("Project Already exists")
        }
        else{
            const newProject = new project({
                title,language,github,website,overview,projectImage,userId
            });
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(500).json(err)
    }


    /* res.status(200).json("project add request recived") */
}

exports.getHomeProject = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getAllProject = async(req,res)=>{

    const searchKey = req.query.search;
    console.log(searchKey);

    const query={
        language:{
            //regular expression , options : "i" - it removes case sensitive
            $regex:searchKey,$options:'i'
        }
    }

    try {
        const homeProject = await projects.find(query)
        res.status(200).json(homeProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getUsersProject = async(req,res)=>{
    try{
        const userId = req.payload
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.editUserProjects = async(req,res)=>{
    const {id} = req.params;
    const userId = req.payload;

    const {title,language,github,website,overview,projectImage} = req.body;

    const uploadedProjectImage = req.file?req.file.filename:projectImage;

    try{
        const updatedProject = await projects.findByIdAndUpdate
            ({_id:id},{title,language,github,website,overview,projectImage:uploadedProjectImage,userId},{new:true})

        await updatedProject.save()
        res.status(200).json(updatedProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}


//delete projects

exports.deleteUserProjects = async(req,res)=>{
    const {id} = req.params;

    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}