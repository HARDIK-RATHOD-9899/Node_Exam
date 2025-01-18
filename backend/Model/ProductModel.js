const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title : {type : String, require : true},
    desc : {type : String, require : true},
    price : {type : String, require : true},
    image : {type : String, require : true},
    category : {type : mongoose.Types.ObjectId, ref : "productsCategory"}
})

const ProductModel = mongoose.model("products",ProductSchema)


module.exports = ProductModel