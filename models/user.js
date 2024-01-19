const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');
const { getErrorMessage } = require('../utils/function');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength : 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.methods.createToken = async function(){
    try{
        const user = this;
        const token = jwt.sign({ _id : user._id}, process.env.JWT_SECRET_KEY);
        console.log(token);
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token;
    } catch (error) {
        next ((getErrorMessage ({
            message: "Something Went Wrong."
        })))
    };
   
}

const User = mongoose.model('User', userSchema);

module.exports = User;