const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String ,
    email:String ,
    cart : [
        {
            id:Number
        }
    ]
})

const User = mongoose.model('User' , userSchema)

module.exports = User