var express = require('express');
var router = express.Router();

router.get('/country', function(req, res, next){
    res.render('admin_country', { title: 'FBDB - Manage Countries' });
});

router.get('/league', function(req, res, next){
    res.render('admin_league', { title: 'FBDB - Manage Leagues' });
})

module.exports = router;
