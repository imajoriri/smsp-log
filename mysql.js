var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.SMSP_LOGS_DB_HOST,
  user     : process.env.SMSP_LOGS_DB_USER,
  password : process.env.SMSP_LOGS_DB_PASSWORD,
  database: process.env.SMSP_LOGS_DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports.connection = connection;
