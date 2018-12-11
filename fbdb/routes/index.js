var express = require('express');
var router = express.Router();
var md5 = require('md5');
const db = require('../lib/db') // get db connection form db.js
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

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

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'FBDB - Register' });
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var name = req.body.name;
  var password1 = req.body.password1;
  var password2 = req.body.password2;

  if(password1 != password2){
      res.render('register', { title: 'FBDB - Register', error: true, message: 'Your passwords doesn\'t match!' });
  }

  var sql = "SELECT * FROM fbdb.user WHERE email = '"+ email +"';";
  db.query(sql, function(err, result){
      if(err) throw err;
      if(result.length > 0){
          // email exists
          res.render('register', { title: 'FBDB - Register', error: true, message: 'Email is already registered!' });
      } else{
          // add to db
          var sql2 = "INSERT INTO fbdb.user (`email`, `name`, `password`, `role`) VALUES ('"+email+"', '"+name+"', '"+md5(password1)+"', '2');"
          db.query(sql2, function(err, result){
              if(err) throw err;
              res.render('register', { title: 'FBDB - Register', error: false, message: 'Register completed.' });
          });
      }
  });
});

/* GET login page. */
router.get('/login', function(req, res, next){
    res.render('login', {title: 'FBDB - Login'})
});

/* POST login page. */
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res, next){

    }
);

module.exports = router;
