var express = require('express');
var router = express.Router();
var db = require('../lib/db');


router.get('/', function(req, res, next){
    res.render('league', {
        title: 'Leagues',
    });
});

router.get('/:id/teams', function(req, res, next){
    res.render('league_teams', {
        title: 'Teams',
    });
});

/*GET teams of the desired league*/
router.get('/:id/teams/list', function(req, res, next){
    console.log(req.params.id);
    var sql = `
    SELECT idTeam as t_id, name as t_name, foundationYear as t_year,
        stadium as t_stadium, logo as t_logo, color1 as t_color1, 
        color2 as t_color2, league as l_id
    FROM fbdb.team
    WHERE league = ?; 
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get teams."
            });
        }
        res.status(200).json(result);
    });
});

/* GET leagues list. */
router.get('/list', function(req, res, next){ // league logosu eklenebilir
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