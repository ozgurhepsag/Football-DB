var express = require('express');
var router = express.Router();

/* GET teams listing. */
router.get('/', function(req, res, next){
    res.render('team', {
        title: 'Teams',
    });
});

module.exports = router;