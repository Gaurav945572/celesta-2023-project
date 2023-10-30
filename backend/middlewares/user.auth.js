const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {


        //verifying the token and returining user id
        const result=jwt.verify(accessToken,process.env.ACCESS_JWT_SECRET)
        if (result) {

            const isExists = await User.findOne({ _id: result._id }).select('_id');

            if (isExists) {
                req._id=isExists._id
                next();
                return;
            }
        }
        return res.status(401).json({ message: "Access Token expired" });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
}



module.exports = { userAuth }
