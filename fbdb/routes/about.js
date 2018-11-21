var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next){
    res.render('about', {
        title: 'About',
        players: [{name: "Player 1", number: 10}, {name: "Player 2", number: 7}],
    });
});

module.exports = router;
