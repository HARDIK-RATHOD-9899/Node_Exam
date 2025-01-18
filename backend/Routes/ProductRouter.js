const { Router } = require("express");
const isAuth = require("../Middleware/isAuth");
const ProductModel = require("../Model/ProductModel");

const ProductRouter = Router();

ProductRouter.post("/createProduct", isAuth, async (req, res) => {
  try {
    let data = await ProductModel.create(req.body);
    res.send(data);
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
});

ProductRouter.get("/allProducts", async (req, res) => {
  try {
    let data = await ProductModel.find().populate("userId", "email username");
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
});

ProductRouter.get("/myProducts", isAuth, async (req, res) => {
  try {
    let data = await ProductModel.find({ userId: req.body.userId }).populate(
      "userId",
      "email username"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
});

ProductRouter.get("/allProducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await ProductModel.findById(id).populate(
      "userId",
      "email username"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
});

ProductRouter.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await ProductModel.findById(id);
    let a = data.like + 1;
    let d = await ProductModel.findByIdAndUpdate(id, { like: a });
    res.status(200).send({ d });
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
});


ProductRouter.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({ msg: "Product ID is required." });
    }

    const result = await ProductModel.findByIdAndDelete(id);
    console.log(result)

    if (!result) {
      return res
        .status(404)
        .send({ msg: "Product not found or not authorized to delete." });
    }

    res.send({ msg: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).send({
      msg: "An error occurred while deleting the Product.",
      error: error.message,
    });
  }
});

ProductRouter.get("/editget/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const Product = await ProductModel.findById(id);
    console.log(Product);


    if (!Product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    res.send({ Product });
  } catch (error) {
    console.error("Error fetching Product:", error.message);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

ProductRouter.patch("/editProduct", isAuth, async (req, res) => {
  try {
    const { id } = req.body;
    
    const Product = await ProductModel.findByIdAndUpdate(id,req.body);
    console.log(Product)

    if (!Product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    res.status(200).send({ msg: "Product updated successfully", Product });
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

ProductRouter.patch("/:id/like", isAuth, async (req, res) => {
  try {
    const Product = await ProductModel.findById(req.params.id);
    if (!Product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Check if user has already liked the Product
    if (Product.likedBy.includes(req.body.userId)) {
      return res.status(400).json({ msg: "You have already liked this Product" });
    }

    Product.like += 1;
    Product.likedBy.push(req.body.userId); // Add user to likedBy
    await Product.save();

    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});



module.exports = ProductRouter;