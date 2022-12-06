const Product = require("../models/product");

class productController {
  // [GET] / man
  async man(req, res) {
    try {
      const data = await Product.fetchByCategory(16);
      // res.render("product/man");
      res.json(data[0]);
    } catch (err) {
      res.json([]);
    }
  }

  // [GET] / woman
  async woman(req, res) {
    try {
      const data = await Product.fetchByCategory(1);
      res.json(data[0]);
    } catch (err) {
      // console.log(err);
      res.json([]);
    }
  }
 
  async product__info(req, res) {
    try {
      const data = await Product.fetchById(req.params.id);
      res.json(data[0][0] || {});
    } catch (err) {
      // console.log(err);
      res.json([]);
    }
  }
  async fetchAll(req, res) {
    try {
      const data = await Product.fetchAll();
      res.json(data[0] || {});
    } catch (err) {
      // console.log(err);
      res.json([]);
    }
  }
}

module.exports = new productController();
