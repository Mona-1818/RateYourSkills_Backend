const User = require('../models/user');
const asynchandler = require('express-async-handler');
const generatetoken = require("../util/generatetoken");

const registration = asynchandler(async(req,res) => {
    const { email, password } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist){
        res.status(400);
        throw new Error("User already Exists.");
    }
    const user = await User.create({
        email,
        password
    });
    if (user) {
        res.status(200).json({
            _id:user._id,
            email: user.email,
            token:generatetoken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Error Occured.");
    }
    
});

const checking = asynchandler(async(req,res) => {
    const{ email, password }= req.body;
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            email: user.email,
            token:generatetoken(user._id),
        });
    } else{
        res.status(401);
        throw new Error("Invalid email or password.");
    }

});

module.exports = { registration, checking };