
const jwt = require('jsonwebtoken');

//*Create Auth Tokens  For Signin and Signup
const CreateAccessToken = (_id) => {
    const accessToken = jwt.sign({ _id }, process.env.ACCESS_JWT_SECRET, { expiresIn: '1d' });
    return accessToken
}

module.exports=CreateAccessToken;