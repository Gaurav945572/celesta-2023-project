const UserModel=require('../models/user.model');
const CreateAccessToken = require('./token/createTokens')


const cookieOptions = {
    httpOnly: true,
    secure:true,
    sameSite:"none",
    // secure: process.env.NODE_ENV === 'production',
    expires:new Date(Date.now()+24*3600*1000)
};

//User Signup controller
const SignUp= async (req,res)=>{
    try {
        let {body}=req;
        const newUser=await UserModel.createUser(body);
        const accessTokenId=await CreateAccessToken(newUser._id); 
        const authTokenExpiry=Date.now()+24 * 60 * 60 * 1000;

        res
        .cookie("accessToken",  accessToken, cookieOptions)
        .status(201)
        .json({ newUser: newUser.name, _id: newUser._id ,authTokenExpiry});

    } catch (error) {

    }
}

const SignIn= (req,res)=>{
    res.json({msg:"SignIn"})
}
const LogOut= (req,res)=>{
    res.json({msg:"LogOut"})
}
module.exports={
    SignUp,
    SignIn,
    LogOut
}