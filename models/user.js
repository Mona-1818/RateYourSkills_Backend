const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type : String,
        },
        email:{
            type: String,
            require: true,
            unique: true,
        },
        password:{
            type: String,
            require: true,
            unique: true,
        },
        location:{
            type : String,
        },
        skills:{
            type : String,
        }
    }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;