const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const path = require('path')
const engine = require('ejs-mate')

mongoose.connect('mongodb://localhost:27017/shoppingcart')
.then(() => {
    console.log('database connected successfully')
})
.catch(err => {
    console.log('error for connecting database')
})

app.engine('ejs', engine);
app.set('view engine' , 'ejs')
app.set('View' , path.join(__dirname,'views'))

// const newUser = new User({
//     'username':'safwan' , 
//     'email':'safwan@gmail.com',
//     'cart':[]
// })

// newUser.cart.push({
//     'id':'7994720767'
// })

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000 , ()=> {
    console.log('shopping app listening on port 3000')
})