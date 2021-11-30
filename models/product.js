const mongoose = require("mongoose");
const configuration = require("../db/config");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required:true,
    min:0
  },
  description: {
     type: String, 
     required: true
   },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// Product.insertMany([

//   {
//     name: "TCL 20 PRO 5g",
//     price: 799,
//     description: "new TCL 20 pro for affordable price",
//     image:  "https://media.wired.com/photos/60fef8076a5b5b55c0e34a0d/1:1/w_2400,c_limit/Gear-TCL-Series-20-Pro-5G.jpg"
// },
//   {
//     name: "REALME 5I",
//     price: 299,
//     description: "new REALME 5I for affordable price",
//     image:'https://cdn1.smartprix.com/rx-iqtLlqI3w-w240-h290/realme-5i.jpg'
//   },
//   {
//     name: "ONE PLUS NORD 2",
//     price: 399,
//     description: "new i phone x for affordable price",
//     image:'https://www.businessinsider.in/photo/photo/81266457/81266457.jpg?imgsize'
//   }
// ]).then(res => console.log(res))
