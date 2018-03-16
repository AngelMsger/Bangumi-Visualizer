var express = require('express');
var db = require('../db');

var router = express.Router();

/* GET api listing. */
router.get('/season/:season_id', function(req, res) {
    db.animes.findOne({season_id: req.params.season_id}, function (error, anime) {
        if (error === null) res.send(JSON.stringify(anime));
    });
});

router.get('/media/:media_id', function(req, res) {
    db.animes.findOne({media_id: req.params.media_id}, function (error, anime) {
        if (error === null) res.send(JSON.stringify(anime));
    });
});

router.get('/authors/:mid', function (req, res) {
   db.authors.findOne({mid: req.params.mid}, function (error, author) {
       if (error === null) res.send(JSON.stringify(author));
   });
});

router.get('/archives/:season_id', function (req, res) {
    db.archives.aggregate([{$replaceRoot: {"newRoot": {$mergeObjects: [{"date": "$date"}, {$arrayElemAt: [{$filter:
                            {input: "$archives", cond: {$eq: ["$$this.season_id", req.param.season_id]}}}, 0]}]}}}],
        function (error, archives) { if (error === null) res.send(JSON.stringify(archives)) });
});

module.exports = router;
