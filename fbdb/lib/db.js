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

// users for auth
exports.findById = function(id, cb) {
  process.nextTick(function() {
    var sql = "SELECT * FROM fbdb.user;"
    db.query(sql, function(err, result){
        if(err) throw err;
        var records = result;
        var idx = id - 1;
        if (records[idUser]) {
          cb(null, records[idUser]);
        } else {
          cb(new Error('User ' + id + ' does not exist'));
        }
    });

  });
}


module.exports = connection;
