const express = require("express");
const router = express.Router();

const productController = require("../app/controllers/productController");
const userController = require("../app/controllers/userController");
const middleware = require("../middleware/index");
router.get("/product_detail/:id", productController.product__info);
router.get("/products", productController.fetchAll);
router.get("/man", productController.man);
router.get("/woman", productController.woman);
router.post("/register", userController.register);
router.post("/checkout", middleware.authenticate(), userController.createOrder);
router.get(
  "/order",
  middleware.authenticate(),
  userController.findOrderByUserId
);
router.get(
  "/order/:id",
  middleware.authenticate(),
  userController.findOrderDetailsByOrderId
);
router.put("/login", userController.login);
router.post("/cart", middleware.authenticate(), userController.showCart);
router.get("/cart", middleware.authenticate(), userController.cartLists);
router.patch("/cart", middleware.authenticate(), userController.updateCartItem);
router.delete(
  "/cart",
  middleware.authenticate(),
  userController.deleteCartItem
);
router.delete(
  "/order/:id",
  middleware.authenticate(),
  userController.deleteOrder
);

module.exports = router;
