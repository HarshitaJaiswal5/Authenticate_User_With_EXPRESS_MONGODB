const User = require("../models/user");
const bcrypt = require('bcryptjs')
const { getErrorMessage}  = require("../utils/function");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const addUser = async (req,res,next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = new User({
            ...req.body,
            password : hashedPassword
            }
            );
        await user.save();
        const token = await user.createToken();
        return res.status(201).send({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        next ( getErrorMessage ({
            message: "Error while adding user. Try again after sometime"
        }));
    }
};


const authenticatorUser = async (req,res,next) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({
            email
        });
        
        if(!user) {
            return next(
                getErrorMessage({
                    status: 404,
                    message: "User not found"
                })
            )
        }
        const isMatching = await bcrypt.compare(password, user.password);
     
        console.log('isMatching', isMatching);
        if(!isMatching){
            return next (getErrorMessage({
                status: "400",
                message: "Invalid Credentials"
            }))
        }

        const token = await user.createToken();
        res.send({
            user,
            token
        } );
    } catch (error) {
        console.log(error)
        next (getErrorMessage({
            message: "Error while authenticating user. Try again!"
        }))

    }
};



module.exports =  {
    addUser,
    authenticatorUser,
}