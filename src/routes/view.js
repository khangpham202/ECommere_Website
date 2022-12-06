const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index");

const viewController = require("../app/controllers/viewController");
const userController = require("../app/controllers/userController");

router.get("/login", viewController.authentication);
router.get("/shoppingCart", viewController.shoppingCart);
router.get("/order", viewController.order);
router.get("/order/:id", viewController.orderDetail);
router.get("/shoppingCart/checkout", viewController.checkOut);
router.post("/shoppingCart/api/checkout",middleware.authenticate(), userController.createOrder);
router.get("/profile", viewController.profile);
router.get("/contact", viewController.contact);
router.get("/product/man", viewController.man);
router.get("/product/woman", viewController.woman);
router.get("/product/children", viewController.children);
router.get("/product/accessories", viewController.accessory);
router.get("/product/:id", viewController.product_detail);
router.get("/", viewController.index);

module.exports = router;
