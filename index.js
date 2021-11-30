const express = require('express')
const app = express()
const asyncError = require('./error/asyncerror')
const Expresserror = require('./error/errorClass')
const mongoose = require('mongoose')
const configuration = require('./db/config')
const Product = require('./models/product')
const User = require('./models/user')
const path = require('path')
const engine = require('ejs-mate')
const methodOverride = require('method-override')


app.engine('ejs', engine);
app.set('view engine' , 'ejs')
app.set('View' , path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname ,'assets')))


app.get('/',asyncError(async(req, res , next) => {
        const allProducts =await Product.find({})
        res.render('user/home' ,  {allProducts})
    
}))

app.get('/admin', async(req, res) => {
    const allProducts =await Product.find({})
    res.render('admin/index' , {allProducts})
})

app.get('/admin/products/:id/edit' ,asyncError(async(req, res ,next) => {
        const { id} = req.params
        const product = await Product.findById(id)
        res.render('admin/edit', {product})

}))

app.get('/admin/products/new' , (req, res) => {
    res.render('admin/addpage')
})

app.post('/admin/products/new',asyncError(async(req, res,next) => {
        await Product.insertMany(req.body)
        res.redirect('/admin')
   
}))

app.put('/admin/products/:id/edit',asyncError(async(req, res , next) =>{
    const { id } = req.params
    if(!req.body.name) next()
    const product = await Product.findByIdAndUpdate(id , req.body)
    res.redirect('/admin')
}))

app.delete('/admin/products/:id/delete' ,asyncError(async(req, res , next) =>{
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/admin')
}))

app.get('/product/:id', asyncError(async(req, res , next) => {
    const { id} = req.params
    const product = await Product.findById(id)
    res.render('user/prodetails' , {product})
}))
app.get('/addtocart/:id' , asyncError(async(req, res)=>{
    const { id} = req.params
    const newuser = await User.findById('61963f90bba23163e098e6ad')
    newuser.cart.push(id)
    await newuser.save()
    console.log(newuser);
    res.send('success')
}))

app.all('*' , (req , res , next) => {
    next(new Expresserror('something went wrong' , 404))
})

app.use((err,req,res,next)=>{
    const { statusCode = 500 , message = 'Something went wrong' } = err
    res.status(statusCode).render('404' , {err})
})

app.listen(3000 , ()=> {
    console.log('shopping app listening on port 3000')
})