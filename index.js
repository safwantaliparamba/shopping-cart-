const express = require('express')
const app = express()
const mongoose = require('mongoose')
const configuration = require('./db/config')
const Product = require('./models/product')
const path = require('path')
const engine = require('ejs-mate')
const methodOverride = require('method-override')


app.engine('ejs', engine);
app.set('view engine' , 'ejs')
app.set('View' , path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));


app.get('/', async(req, res) => {
    const allProducts =await Product.find({})
    res.render('user/home' ,  {allProducts})
})

app.get('/admin', async(req, res) => {
    const allProducts =await Product.find({})
    res.render('admin/index' , {allProducts})
})
app.get('/admin/products/:id/edit' , async(req, res) => {
    const { id} = req.params
    const product = await Product.findById(id)
    res.render('admin/edit', {product})
})
app.get('/admin/products/new' , (req, res) => {
    res.render('admin/addpage')
})

app.post('/admin/products/new',async(req, res) => {
    await Product.insertMany(req.body)
    res.redirect('/admin')
})

app.put('/admin/products/:id/edit', async(req, res) =>{
    const { id} = req.params
    const product = await Product.findByIdAndUpdate(id , req.body)
    res.redirect('/admin')
})

app.delete('/admin/products/:id/delete' , async(req, res) =>{
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/admin')
})

app.get('/product/:id', async(req, res) => {
    const { id} = req.params
    const product = await Product.findById(id)
    res.render('user/prodetails' , {product})
})


app.listen(3000 , ()=> {
    console.log('shopping app listening on port 3000')
})