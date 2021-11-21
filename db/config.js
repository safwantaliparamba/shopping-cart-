const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shoppingcart')
.then(() => {
    console.log('database connected successfully')
})
.catch(err => {
    console.log('error for connecting database')
})

module.exports = mongoose