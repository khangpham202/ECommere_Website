const db = require("../../config/db/index");

class Product {
  constructor() {}
  async fetchByCategory(categoryId) {
    const productsData = await db.query(
      `SELECT * from product where category_id = ${categoryId}`
    );
    return productsData;
  }
  async fetchById(id) {
    const productItem = await db.query(
      `SELECT * from product where id = '${id}'`
    );
    return productItem;
  }
  async fetchAll() {
    const productItems = await db.query(
      `SELECT * from product`
    );
    return productItems;
  }
  
}
module.exports = new Product();
