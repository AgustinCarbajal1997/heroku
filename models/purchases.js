const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const purchaseSchema = new Schema({
    products:[
        {
            productId:String,
            title:String,
            unites:Number,
            price:Number
        }
    ],
    total:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Purchase = new model("purchase", purchaseSchema);

module.exports = Purchase;