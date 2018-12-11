var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var db = require('./lib/db')
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

/* Passport JS config */
// serialize to use in session
passport.serializeUser(function(user, done) {
  done(null, user.idUser);
});

// deserialize
passport.deserializeUser(function(id, done) {
  db.query("SELECT * FROM fbdb.user WHERE idUser = ?", [id], function(error, result) {
      done(error, result[0]);
  })
});

// sign-up
passport.use(
  'local-signup',
  new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password1',
          passReqToCallback: true
  }, 
  function(req, email, password, done) {
      db.query("SELECT * FROM fbdb.user WHERE email = ?", [email], function(error, result) {
          if (error){
              return done(error);
          }
          if (result.length) {
              return done(null, false, req.flash('registerMesage', 'Username already taken'));
          } else {
              var newUser = {
                  email: email,
                  password: bcrypt.hashSync(password, null, null),
                  name: req.body.name
              };
              var insertQuery = "INSERT INTO fbdb.user(email, password, name) VALUES (?, ?, ?)";
              db.query(insertQuery, [newUser.email, newUser.password, newUser.name], function(error, result){
                  if (error){
                    return done(error);
                  }
                  newUser.idUser = result.insertId;
                  return done(null, newUser);
              }); 
          }
      })
  }
  )
);

// login
passport.use(
  'local-login',
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
  },
  function(req, email, password, done) {
      db.query("SELECT * FROM fbdb.user WHERE email = ?", [email] , function(error, result) {
          // Query error
          if (error) {
              return done(error);
          }

          // Query returned no users
          if (!result.length) {
              return done(null, false, req.flash('loginMessage', 'No user found'));
          }

          // User is found, check password
          if (!bcrypt.compareSync(password, result[0].password)) {
              return done(null, false, req.flash('loginMessage', 'Wrong password'));
          }

          // Successful login
          console.log("User logged in: " + result[0].email)
          return done(null, result[0]);
      })
  })
);

var apiCountryRouter = require('./routes/api/country');
var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/admin')]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// Session initialize
app.use(session({
  secret: 'helloworld',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* MIDDLEWARES */
// Check if logged in
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    // redirect to login page if not logged in
    res.redirect('/login');
  }
}

// Check if not logged in
function notLoggedIn(req, res, next) {
  if (req.user) {
    // redirect to home if logged in
    res.redirect('/');
  } else {
    next();  
  }
}

// Check if admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role == 1) {
    console.log("You are admin, you can pass.");
    next();
  } else {
    console.log("You are not admin.");
    res.redirect('/');
  }
}

// Pass req object to all views
app.use(function(req, res, next) {
  res.locals.req = req;
  next(); // go to route
})

/* ROUTES */
app.use('/', indexRouter);
app.use('/api', apiCountryRouter);
app.use('/admin', isAdmin, adminRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

// GET login
app.get('/login', notLoggedIn, function(req, res, next) {
  res.render('login', { title: 'FBDB - Login', message: req.flash('loginMessage') });
});

// GET register
app.get('/register', notLoggedIn, function(req, res, next) {
  res.render('register', { title: 'FBDB - Register' });
});

// GET logout
app.get('/logout', loggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
})

// POST login
app.post('/login', notLoggedIn, passport.authenticate('local-login', {
    successRedirect : '/', // redirect to home
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }), function(req, res, next) {
    res.redirect('/');
  }
);

// POST register
app.post('/register', notLoggedIn, passport.authenticate('local-signup', {
    successRedirect : '/', // redirect home
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }), function(req, res, next) {
    res.redirect('/');
  }
);

/* ERROR HANDLERS */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;