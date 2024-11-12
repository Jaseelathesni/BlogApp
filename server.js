const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
// const dotenv=require('dotenv');
const app=express();
const path=require('path');
require('dotenv').config();





mongoose.connect(process.env.DB_URI
//     useNewUrlParser:true, // use the new URL Parser
//     useUnifiedTopology:true // use the new server discovery and monitoring engine
);

// middleware to enable cors
app.use(cors());

// serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// import and use the blog routes
const blogRouter=require('../BlogApp/routes/route');
app.use('/',blogRouter);

// serve the main HTML file for the root url
app.get('/' ,(req,res) => {
    res.sendFile(path.join(__dirname, 'views' , 'index.html'));
});


const PORT=3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});