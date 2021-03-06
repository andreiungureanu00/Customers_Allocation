var mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

connection.connect(function (err) {
  if (!err) {
    console.log(`App is connected to ${process.env.DB} database`);
  } else {
    console.log(err);
  }
});

module.exports = { connection };
