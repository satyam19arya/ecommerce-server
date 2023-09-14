const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error, success } = require('../utils/responseWrapper');

const signupController = async (req, res) => {
    try{
        const {firstname, lastname, email, mobile, password} = req.body;

        if(!firstname || !lastname || !email || !mobile || !password){
            return res.send(error(400, 'All fields are required'));
        }

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send(error(409, 'User is already registered'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            mobile, 
            password: hashedPassword
        })
        return res.send(success(201, {user}));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.send(error(400, 'All fields are required'));
        }
    
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.send(error(404, 'User not found'));
        }
    
        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            return res.send(error(403, 'Invalid credentials'));
        }
    
        const accessToken = generateAccessToken({ _id: user._id})
        const refreshToken = generateRefreshToken({ _id: user._id})

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, {accessToken}));
    }catch(e){
        return res.send(error(500,e.message));
    }
}

const refreshAccessToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt){
        return res.send(error(401, 'Refresh token in cookie is required'));
    }

    const refreshToken = cookies.jwt;
    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id = decoded._id;
        const accessToken = generateAccessToken({_id});
        return res.send(success(201, {accessToken}));

    }catch(e){
        console.log(e);
        return res.send(error(401, 'Invalid refresh token'));
    }
}

const logoutController = async (req, res) => {
    try{
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        });
        //refresh token deleted and access token should be deleted by frontend
        return res.send(success(200, 'user logged out'));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const generateAccessToken = (data) => {
    try{
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {expiresIn: '1d'});
        return token;
    }catch(e){
        console.log(e);
    }
}

const generateRefreshToken = (data) => {
    try{
        const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {expiresIn: '1y'});
        return token;
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    signupController,
    loginController,
    refreshAccessToken,
    logoutController
}