const Category = require("../models/categoryModel");
const Products = require('../models/productModel')

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res
          .status(400)
          .json({ message: "This category already exists" });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json({ message: "Created a category" });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({category: req.params.id})
      if(products) return res.status(400).json({
        message: "Please delete all products with a relationship."
      })
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted a category" });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ message: "Updated a category" });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = categoryCtrl;
