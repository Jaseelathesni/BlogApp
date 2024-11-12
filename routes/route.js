const express=require('express');
const router=express.Router();
const Blog=require('../models/schema');

const bodyParser=require('body-parser');

router.use(bodyParser.json()); // parses json data
router.use(bodyParser.urlencoded({extended:true})); // parses from data

// get end point to retrieve all blogs,sorted by data in descending order
router.get('/blog',async(req,res) => {
    try {
        const blogs=await Blog.find().sort({data:-1});
        res.json(blogs); // send the blogs as a JSON response
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

// POST end point to create a new blog
router.post('/blog',async(req,res)=>{
    const blog=new Blog({
        title:req.body.title,
        imgUrl:req.body.imgUrl,
        content:req.body.content
    });

    try {
        const newBlog=await blog.save(); // save the new blog in the database
        res.status(201).json(newBlog); // send the created blog as a json response
    } catch(error){
        res.status(400).json({message:error.message}); // if an error occur,send a 400 response
    }
});

// PUT endpoint to update an existing blog by id
router.put('/blog/:id',async(req,res)=>{
    try {
        const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatedBlog); 
    } catch(error){
        res.status(400).json({message:error.message});
    }
});

//DELETE endpoint to delete an existing blog by id
router.delete('/blog/:id',async(req,res)=>{
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({message: 'Blog deleted'});
    } catch(error){
        res.status(500).json({message:error.message});
    }
});
module.exports=router;
