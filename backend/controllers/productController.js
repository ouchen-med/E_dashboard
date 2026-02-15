const Product = require('../models/Product');

// ====== Get all products ======
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Add new product 

const addProduct = async (req, res) => {
  try {
    const { name, description, price, discount, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discount: discount || 0,
      stock,
      image: req.file.path // المسار اللي خزنه Multer
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, data: savedProduct });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//  Delete product 
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Update product 
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    //  updates
    Object.assign(product, updates);

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, data: updatedProduct });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
};
