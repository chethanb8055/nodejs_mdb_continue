const mongoose = require('mongoose');
const { Schema } = mongoose;



//schema

// 'productSchema ' this is configeration through this we make model
const productSchema = new Schema({
    // title: String, // String is shorthand for {type: String}
    title: {type:String,required:true},
    description: String,
    price: {type:Number,min:[0,'wrong price'], required:true},
    discountPercentage: Number,
    rating: {type:Number,min:[0,'wrong rating'],max:[5,'wrong rating']},
    stock:Number,
    brand: {type:String,required:true},
    category:{type:String,required:true},
    // category:String,
    thumbnail:{type:String,required:[true,'please enter valide one']},
    images:[String]
  });


  //model first is singular then it make flural
//it combine this two Product & productSchema
exports.Product = mongoose.model('Product', productSchema);

