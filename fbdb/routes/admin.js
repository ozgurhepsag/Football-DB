var express = require('express');
var router = express.Router();

router.get('/country', function(req, res, next){
    res.render('admin_country', { title: 'FBDB - Manage Countries' });
});

router.get('/league', function(req, res, next){
    res.render('admin_league', { title: 'FBDB - Manage Leagues' });
});

router.get('/team', function(req, res, next){
    res.render('admin_team', { title: 'FBDB - Manage Teams' });
});

router.get('/trophy', function(req, res, next){
    res.render('admin_trophy', { title: 'FBDB - Manage Trophies' });
});

router.get('/match', function(req, res, next){
    res.render('admin_match', { title: 'FBDB - Manage Matches' });
});

router.get('/manager_contract', function(req, res, next){
    res.render('admin_manager_contract', { title: 'FBDB - Manage Manager Contracts' });
});

router.get('/manager', function(req, res, next){
    res.render('admin_manager', { title: 'FBDB - Manage Managers' });
});

router.get('/player_contract', function(req, res, next){
    res.render('admin_player_contract', { title: 'FBDB - Manage Player Contracts' });
});

router.get('/player_statistics', function(req, res, next){
    res.render('admin_player_statistics', { title: 'FBDB - Manage Player Statistics' });
});

router.get('/player_team', function(req, res, next){
    res.render('admin_player_team', { title: 'FBDB - Manage Player / Team' });
});

router.get('/player', function(req, res, next){
    res.render('admin_player', { title: 'FBDB - Manage Players' });
});

module.exports = router;
