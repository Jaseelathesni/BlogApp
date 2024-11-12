const mongoose = require('mongoose');

// define a schema for the blog using mongoose
const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    imgUrl:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:Date,default:Date.now}
});
module.exports=mongoose.model('Blog',blogSchema);