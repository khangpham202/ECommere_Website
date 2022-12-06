const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Order = require("../models/order");
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (fullName && email && password) {
      const data = await User.createUser(req.body);
      return res.json(data[0]);
    }
    return res.status(400).json({ message: "Error" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    if (fullName && password) {
      const data = await User.login(req.body);
      return res.json(data);
    }
    return res.status(400).json({ message: "Error" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
};

const showCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
      throw new Error("Error");
    }
    let product = await Product.fetchById(product_id);
    product = product[0][0];
    if (!product) {
      throw new Error("Product not found");
    }
    const price = Number(product.price.replaceAll("₫", "").replaceAll(".", ""));
    const totalMoney = price * quantity;
    let cart = await Cart.findCart({ user_id, product_id });
    cart = cart[0][0];
    if (!cart) {
      await Cart.createCart({
        user_id,
        product_id,
        quantity,
        totalMoney,
        price,
      });
    } else {
      await Cart.updateCart({
        id: cart.id,
        total: Number(cart.total_money) + Number(totalMoney),
        quantity: Number(cart.quantity) + Number(quantity),
      });
    }
    const data = await Cart.findAllCardByUserId({ user_id });
    return res.json(data[0]);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const cartLists = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = await Cart.findAllCardByUserId({ user_id });
    return res.json(data[0]);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cart_id = req.body.cart_id;
    const data = await Cart.deleteCartItemById({ cart_id });
    return res.json(data[0]);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
const updateCartItem = async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const cart_id = req.body.id;
    const data = await Cart.updateCartItemById({ quantity, cart_id });
    return res.json(data[0]);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    req.body.user_id = user_id;
    const { fullName, email, phoneNumber, address, note, total } = req.body;
    if (fullName && email && phoneNumber && address && note && total) {
      const data = await Order.createOrder(req.body);
      return res.json(data[0]);
    }
    return res.status(400).json({ message: "Error" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
};

const findOrderByUserId = async (req, res) => {
  try {
    const user_id = req.user.id;
    let datas = await Order.findOrderByUserId(user_id);
    datas = datas[0];
    let order = {};
    datas.forEach((data) => {
      if (!order[data.orderId]) {
        order[data.orderId] = datas.filter(
          (item) => item.orderId === data.orderId
        );
      }
    });
    let orders = [];
    for (let i in order) {
      let orderDatas = await Order.findOrderById(Number(i));
      orderDatas = orderDatas[0][0];
      orders.push({ ...orders, orderDetail: order[i] });
    }
    return res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err.message });
  }
};

const findOrderDetailsByOrderId = async (req, res) => {
  try {
    const data = await Order.findOrderDetailsByOrderId(req.params.id);
    res.json(data[0] || {});
  } catch (err) {
    // console.log(err);
    res.json([]);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const data = await Order.deleteOrderByOrderId({ order_id });
    return res.json(data[0]);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  showCart,
  cartLists,
  deleteCartItem,
  createOrder,
  findOrderByUserId,
  findOrderDetailsByOrderId,
  deleteOrder,
  updateCartItem,
};
