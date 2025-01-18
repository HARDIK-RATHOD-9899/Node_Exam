const mongoose = require("mongoose")

const ProductCategoreySchema = mongoose.Schema({
    name:{type:String,require:true}
})

const ProductCategoreyModel=mongoose.model("productsCategorey",ProductCategoreySchema)

module.exports=ProductCategoreyModel