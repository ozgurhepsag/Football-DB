const mysql = require('mysql');

// create connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'FbDb_1234',
    schema: 'fbdb'
});

// connect
connection.connect((err) => {
    if(err){
        console.log("Error while connecting to mysql...")
        throw err;
    }
    console.log("Mysql connected...");
});

module.exports = connection;
