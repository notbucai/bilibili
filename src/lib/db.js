const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "134.175.0.187",
  user: "root",
  password: "",
  database: 'bilibli',
  insecureAuth: true
});
connection.connect((err) => {
  if (err) return console.error('connection' + err);
  console.log('connection mysql success');
});

module.exports = connection;