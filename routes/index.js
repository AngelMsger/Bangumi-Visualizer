var express = require('express');
var db = require('../db');

var router = express.Router();

/* GET api listing. */
router.get('/anime/season_id/:season_id', function(req, res) {
    console.log('query' + req.params.season_id);
    db.animes.findOne({season_id: req.params.season_id}, function (error, anime) {
        if (error === null) res.send(JSON.stringify(anime));
    });
});

router.get('/anime/media_id/:media_id', function(req, res) {
    db.animes.findOne({media_id: req.params.media_id}, function (error, anime) {
        if (error === null) res.send(JSON.stringify(anime));
    });
});

router.get('/author/mid/:mid', function (req, res) {
    db.authors.findOne({mid: req.params.mid}, function (error, author) {
        if (error === null) res.send(JSON.stringify(author));
    });
});

router.get('/archive/season_id/:season_id', function (req, res) {
    db.archives.aggregate([{$replaceRoot: {newRoot: {$mergeObjects: [{date: '$date'}, {$arrayElemAt: [{$filter:{
                                input: '$archives', cond: {$eq: ['$$this.season_id', Number(req.params.season_id)]}}}, 0]}]}}}],
        function (error, archives) {
            if (error === null) res.send(JSON.stringify(archives));
        });
});

module.exports = router;
