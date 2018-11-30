var express = require('express');
var router = express.Router();

router.get('/country', function(req, res, next){
    res.render('admin_country', { title: 'FBDB - Manage Countries' });
});

module.exports = router;
