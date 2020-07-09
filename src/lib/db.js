const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wx123456",
  database: 'bilibili',
  // insecureAuth: true
});
connection.connect((err) => {
  if (err) return console.error('connection' + err);
  console.log('connection mysql success');
});

module.exports = connection;