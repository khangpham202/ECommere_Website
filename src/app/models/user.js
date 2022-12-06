const db = require("../../config/db/index");
var jwt = require("jsonwebtoken");
const login = async ({ fullName, password }) => {
  const checkFullName = await db.query(
    `SELECT * from user where fullname = '${fullName}'`
  );
  const user = checkFullName[0][0];
  if (!user) {
    throw new Error("sai tai khoan");
  }
  if (user.password !== password) {
    throw new Error("sai mat khau");
  }
  const token = jwt.sign({ id: user.id, role: user.role_id }, "privateKey");
  return { token };
};
const createUser = async ({ fullName, email, password }) => {
  const checkFullName = await db.query(
    `SELECT * from user where fullname = '${fullName}'`
  );
  if (checkFullName[0][0]) {
    throw new Error("tai khoan da ton tai");
  }
  const userData = await db.query(
    `INSERT INTO user (fullname, email, password) VALUES ('${fullName}', '${email}','${password}')`
  );
  return userData;
};

const payLoadToken = async (token) => {
  let data = new Promise((resolve, reject) => {
    jwt.verify(token, "privateKey", function (err, decoded) {
      if(err){
        return reject(err);
      }
      return resolve(decoded);
    });
  });
  return data;
};
module.exports = { createUser, login, payLoadToken };
