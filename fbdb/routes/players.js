var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/:id/', function(req, res, next){
    var sql = `
        SELECT firstName as p_fname, lastName as p_lname 
        FROM fbdb.player 
        WHERE idPlayer = ?;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get players."
            });
        }

        // User logged in
        if (req.user) {
            var sql2 = `
                SELECT *
                FROM fbdb.user_player
                WHERE player = ? AND user = ?;
            `;
            console.log(req.user);
            db.query(sql2, [req.params.id, req.user.idUser], function(error2, result2) {
                if (error2) {
                    console.log(error2);
                    res.status(404).json({
                        error: "Error"
                    });
                }
                console.log(result2.length);
                if (result2 && result2.length > 0) {
                    console.log("First checkpoint!!!");
                    res.render('player', {
                        isLiked: true,
                        title: "Player - " + result[0].p_fname + " " + result[0].p_lname,
                    });
                } else {
                    res.render('player', {
                        isLiked: false,
                        title: "Player - " + result[0].p_fname + " " + result[0].p_lname,
                    });              
                }              
            }) 
        } else {
            console.log("Second checkpoint!!!");
            res.render('player', {
                title: "Player - " + result[0].p_fname + " " + result[0].p_lname,
                isLiked: false
            });
        }     
    });
});

router.get('/:id/profile', function(req, res, next){
    var sql = `
    SELECT firstName as p_fname, lastName as p_lname, position as p_position, image as p_image, birthDate as p_bt, idPlayer as p_id, number as p_number, team as p_teamid, name as p_teamname
    FROM fbdb.player, fbdb.player_team, fbdb.team  
    WHERE idPlayer = ? and fbdb.player_team.player = fbdb.player.idPlayer and fbdb.player_team.team = fbdb.team.idTeam;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get profile."
            });
        }
        
        res.status(200).json(result[0]);
    });
});

router.get('/:id/statistics', function(req, res, next){
    var sql = `
    SELECT season as s_season, goal as s_goal, assist as s_assist, name as s_team, team as s_teamid
    FROM fbdb.player_statistics, fbdb.team
    WHERE player = ? and idTeam = team
    ORDER BY season DESC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get statistics."
            });
        }
        
        res.status(200).json(result);
    });
});

router.get('/:id/contracts', function(req, res, next){
    var sql = `
    SELECT t.name as c_teamname, pc.startDate as c_start, pc.endDate as c_end, pc.value as c_value, t.idTeam as c_teamid
    FROM fbdb.player_contract as pc, fbdb.team as t
    WHERE pc.team = t.idTeam and pc.player = ?
    ORDER BY c_end DESC;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contracts."
            });
        }
        
        res.status(200).json(result);
    });
});

router.get('/:id/likes', function(req, res, next){
    var sql = `
        SELECT COUNT(*) as likes
        FROM fbdb.user_player as UP
        WHERE UP.player = ?
        GROUP BY player
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: "Failed to get contracts."
            });
        }

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(200).json({likes: 0});
        }
        
    });
});

router.post('/:id/likes', function(req, res, next){
    // Check if user already liked the player
    var sql1 = `
        SELECT *
        FROM fbdb.user_player
        WHERE player = ? AND user = ?;
    `;

    db.query(sql1, [req.params.id, req.user.idUser], function(error, result){
        // First query failed
        if (error) {
            res.status(404).json({
                error: "Failed to get likes."
            });
        }

        // If not liked, then like
        if (!result || result.length == 0) {
            console.log("Didnt like before");
            var sql2 = `
                INSERT INTO fbdb.user_player(user, player)
                VALUES(?, ?);
            `;
            console.log(req.user.idUser);
            db.query(sql2, [req.user.idUser, req.params.id], function(error, result){
                if (error) {
                    console.log(error);
                    res.status(404).json({
                        error: "Failed to submit likes."
                    });
                }
                console.log("Like successs");
                res.status(200).json({like: true});
            });
        }
        // If liked, remove like
        else {
            console.log("Liked before");
            var sql2 = `
                DELETE FROM fbdb.user_player
                WHERE player = ? AND user = ?;
            `;
            db.query(sql2, [req.params.id, req.user.idUser], function(error, result){
                if (error) {
                    console.log(error);
                    res.status(404).json({
                        error: "Failed to delete likes."
                    });
                }
                console.log("Unlike success");
                res.status(200).json({like: false});
            });
        }
        
    });
});

router.get('/:id/comments', function(req, res, next){
    var sql = `
        SELECT C.comment, C.date, U.idUser, U.email, U.name
        FROM fbdb.user_player_comment as C, fbdb.user as U
        WHERE player = ? AND idUser = user
        ORDER BY date;
    `;

    db.query(sql, [req.params.id], function(error, result){
        if (error) {
            res.status(404).json({
                error: 'Error while reading comments.'
            });
        }

        res.status(201).json({
            comments: result
        });
    })
});

router.post('/:id/comments', function(req, res, next){
    var sql = `
        INSERT INTO fbdb.user_player_comment(user, player, comment, date)
        VALUES(?, ?, ?, ?);
    `;

    db.query(sql, [req.user.idUser, req.params.id, req.body.comment, new Date()], function(error, result){
        if (error) {
            res.status(404).json({
                error: 'Error while saving comment.'
            });
        }

        res.status(201).json({
            success: 'Comment saved successfully!'
        });
    });
});


module.exports = router;