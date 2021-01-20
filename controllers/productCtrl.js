const Products = require("../models/productModel");

//Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    // console.log({ before: queryObj }); //before delete page

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((excludedField) => delete queryObj[excludedField]);

    // console.log({ after: queryObj }); // after delete page

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    // console.log({ queryStr });

    //gte = greater than or equal
    //lte = lesser then or equal
    //lt = greater than
    //gt = greater than

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").json(" ");
      this.query = this.query.sort(sortBy);
      // console.log(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  getProduct: async (req, res) => {
    try {
      // const products = await Products.find();
      // console.log(req.query);
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ message: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ message: "This product already exist" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ message: "Created a product" });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted a product" });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ message: "No image upload" });

      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ message: "Updated a product" });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = productCtrl;
