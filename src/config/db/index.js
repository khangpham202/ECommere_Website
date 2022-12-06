// const mysql = require("mysql");
// async function connect() {
//   try {
//     await mysql.createConnection({
//       host: "localhost:3306",
//       user: "root",
//       password: "1",
//       database: "e_commerce",
//     });
//     console.log("Connect successfully");
//   } catch (e) {
//     console.log("Connect failed!!");
//   }
// }

// module.exports = { connect };

const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1",
  database: "e_commerce",
});
module.exports = pool.promise();
