const userRouter=require('express').Router();
const { SignUp, SignIn, LogOut } = require('../controllers/user.controller');

userRouter.post('/signup',SignUp);

userRouter.post('/signin',SignIn);

userRouter.post('logout',LogOut);

module.exports=userRouter;