const db = require("../../config/db/index");

const createCart = async ({
  user_id,
  product_id,
  quantity,
  totalMoney,
  price,
}) => {
  const datas = db.query(
    `INSERT INTO cart (user_id, product_id, quantity, total_money, price) VALUES ('${user_id}', '${product_id}','${quantity}','${totalMoney}','${price}')`
  );
  return datas;
};

const updateCart = async ({ id, quantity, total }) => {
  const datas = db.query(
    `UPDATE cart set quantity = '${quantity}', total_money = '${total}' where id = '${id}'`
  );
  return datas;
};

const findCart = async ({ user_id, product_id }) => {
  const datas = db.query(
    `SELECT * from cart where user_id = '${user_id}' and product_id = '${product_id}' and  status = 1`
  );
  return datas;
};

const findAllCardByUserId = async ({ user_id }) => {
  const datas = db.query(
    `SELECT *, cart.id as id_cart from cart left JOIN product on product.id = cart.product_id where cart.user_id = ${user_id} and cart.status = 1`
  );
  return datas;
};

const deleteCartItemById = async ({ cart_id }) => {
  const datas = db.query(`delete from cart where id = ${cart_id}`);
  return datas;
};

const updateCartItemById = async ({ quantity, cart_id }) => {
  const datas = db.query(`UPDATE cart SET quantity = ${quantity}, total_money = price * quantity WHERE id = ${cart_id}`);
  return datas;
}


module.exports = {
  createCart,
  updateCart,
  findCart,
  findAllCardByUserId,
  deleteCartItemById,
  updateCartItemById
};
