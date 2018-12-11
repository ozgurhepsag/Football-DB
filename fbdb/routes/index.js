var express = require('express');
var router = express.Router();
var md5 = require('md5');
const db = require('../lib/db') // get db connection form db.js
let passport;

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM fbdb.player;"
  let players = [];
  db.query(sql, function(err, result){
      if(err) throw err;
      for(let i=0; i<result.length; i++){
          players.push({
              id: result[i].idPlayer,
              firstName: result[i].firstName,
              lastName: result[i].lastName,
              position: result[i].position
          });
          console.log("Pushed");
      }
      console.log("Players length:" + players.length);
      res.render('index', { title: 'FBDB - Football Database', players: players });
  });

});

module.exports = router;
