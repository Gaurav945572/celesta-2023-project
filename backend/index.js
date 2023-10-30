/**
 * Importing required modules
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');

//Express App creation
const app = express();

//configuring environmental variables and secret keys
require('dotenv').config();

//importing routers
const userRouter=require('./routes/user.router');

//using middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_ENCRYPT_SECRET.toString()));
app.use(cookieEncrypter(process.env.COOKIE_ENCRYPT_SECRET.toString()));


app.get('/',(req,res)=>{
    res.json({message:"Hello World"});
})

/**
 * User router contains all user related routes
 */
app.use('/user',userRouter);


// starting the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});