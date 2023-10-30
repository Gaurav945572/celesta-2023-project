/**
 * User Model Exists here
 */

const mongoose = require('mongoose');

//validator to check user details are valid or not
const validator = require("validator");

//bcryptjs for password hashing
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true,},
    password: { type: String, required: true },
    user: {
        name: { type: String,default:"" },
        gender: { type: String, default: "" },
        age:{type:Number,required:true}
    }
});

userSchema.static.createUser=async function createUser({name, email,password,gender,age}){
    try {
        if (!validator.isEmail(email)) {
            throw new Error("Invalid Email", { statusCode: 406 });
        }

          //checking if email  already exist
        var check = await this.findOne({ email: email });
        if (check) {
            throw new Error("Email Already Exist", { statusCode: 302 })
        }
      
        if (!validator.isStrongPassword(password)) {
            throw Error("Password Not Strong", { statusCode: 406 });
        }
        //storing password
        const salt = bcryptjs.genSaltSync(12);
        const hashPassword = bcryptjs.hashSync(password, salt);
        
        //crreating user
        const newUser = new this({ email, password: hashPassword, user: {  email,gender,age } });
        newUser.save();

        return { username: newUser.name, _id: newUser._id };

    } catch (error) {
        return ;
    }
}

module.exports = mongoose.model('user', userSchema);