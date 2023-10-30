//creating router
const userRouter=require('express').Router();

//Importing the controller functions
const { SignUp, 
        SignIn,
        LogOut } = require('../controllers/user.controller');

// Importing MiddleWares
const {userAuth}=require('../middlewares/user.auth');


//User routes

userRouter.post('/signup',SignUp);

userRouter.post('/signin',SignIn);

userRouter.post('/logout',LogOut);


//exporting router
module.exports=userRouter;