var express = require('express');
var router = express.Router();
var db = require('../lib/db');


router.get('/', function(req, res, next){
    res.render('league', {
        title: 'Leagues',
    });
});

/* GET leagues listing. */
router.get('/list', function(req, res, next){
    var sql = `
    SELECT L.idLeague as l_id, L.name as l_name, C.flag as c_flag 
    FROM fbdb.league as L, fbdb.country as C 
    WHERE L.country=C.idCountry;
    `;

    db.query(sql, function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get leagues."
            });
        }
        res.status(200).json(result);
    });
});

module.exports = router;