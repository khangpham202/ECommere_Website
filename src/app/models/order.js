const db = require("../../config/db/index");

const createOrder = async ({
  user_id,
  fullName,
  email,
  phoneNumber,
  address,
  note,
  total,
}) => {
  const date = new Date().toISOString();
  try {
    let cart = await db.query(
      `SELECT * from cart where cart.user_id = ${user_id} and cart.status = 1`
    );
    cart = cart[0];
    const datas = await db.query(
      `INSERT INTO orders (user_id, fullname, email, phone_number, address, note, total_money, order_date)
      VALUES ('${user_id}', '${fullName}','${email}','${phoneNumber}','${address}','${note}','${total}', '${date}')`
    );
    await db.query(`DELETE from cart where user_id = ${user_id}`);
    for (let i of cart) {
      await db.query(
        `INSERT INTO order_details (order_id, product_id, price, num, total_money) 
        VALUES (${datas[0].insertId}, '${i.product_id}','${i.price}','${i.quantity}','${i.total_money}')`
      );
    }
    return datas;
  } catch (err) {
    console.log(err);
  }
};

const findOrderByUserId = async (user_id) => {
  const datas = await db.query(
    `select *,SUM(num) as sum, orders.id as orderId, product.id as productId from order_details 
    join orders join product where orders.id = order_details.order_id and product.id = order_details.product_id 
    and orders.user_id = ${user_id} group by order_details.product_id
    `
  );
  return datas;
};

const findOrderById = async (id) => {
  const datas = await db.query(
    `select * from orders where id = ${id} 
    `
  );
  return datas;
};

const findOrderDetailsByOrderId = async (id) => {
  const datas = await db.query(
    `
    select *,SUM(num) as sum, orders.id as	 orderId, product.id as productId from order_details join orders join product 
    where orders.id = order_details.order_id and product.id = order_details.product_id and orders.id = ${id} 
    group by order_details.product_id
    `
  );
  return datas;
};

const deleteOrderByOrderId = async ({order_id}) => {
  const datas = db.query(
    `delete from order_details where order_id = ${order_id}`
  );
  return datas;
}



module.exports = {
  createOrder,
  findOrderByUserId,
  findOrderById,
  findOrderDetailsByOrderId,
  deleteOrderByOrderId
};
