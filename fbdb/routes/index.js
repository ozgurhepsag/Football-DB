var express = require('express');
var router = express.Router();
var md5 = require('md5');
const db = require('../lib/db') // get db connection form db.js
let passport;

/* GET home page. */
router.get('/', function(req, res, next) {
    var sqlViewTopPlayers = `
        SELECT *
        FROM fbdb.top_10_players;
    `;

    db.query(sqlViewTopPlayers, function(error, result){
        if (error) {
            res.status(404).send('Not found');
        }
        res.render('index', { 
            title: 'FBDB - Football Database',
            top10players: result
        });

    });
    
});

router.get('/players', function(req, res, next){
    var sql = `
        SELECT *
        FROM fbdb.player;
    `;

    db.query(sql, function(error, result) {
        if (error) {
            res.status(404).send('Not found');
        }
        res.render('players', { 
            title: 'FBDB - Players',
            players: result
        });
    });
});

router.get('/teams', function(req, res, next){
    var sql = `
        SELECT *
        FROM fbdb.team;
    `;

    db.query(sql, function(error, result) {
        if (error) {
            res.status(404).send('Not found');
        }
        res.render('teams', { 
            title: 'FBDB - Teams',
            teams: result
        });
    });
})
module.exports = router;
