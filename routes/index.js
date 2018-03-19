const express = require('express');
const conf = require('../conf');
const db = require('../db');

const router = express.Router();

/* GET api listing. */
router.get('/anime/season_id/:season_id', function(req, res) {
    const key = 'anime-season-id:' + req.params.season_id;
    const cache = db.redis.get(key);
    if (cache) {
        res.send(cache);
    }
    else {
        db.animes.findOne({season_id: req.params.season_id}, function (error, anime) {
            if (error === null) {
                const result = JSON.stringify(anime);
                res.send(result);
                db.redis.set(key, JSON.stringify(result), 'EX', conf.redisKVTTL);
            }
        });
    }
});

router.get('/anime/media_id/:media_id', function(req, res) {
    const key = 'anime-media-id:' + req.params.season_id;
    const cache = db.redis.get(key);
    if (cache) {
        res.send(cache);
    }
    else {
        db.animes.findOne({media_id: req.params.media_id}, function (error, anime) {
            if (error === null) {
                const result = JSON.stringify(anime);
                res.send(result);
                db.redis.set(key, result, 'EX', conf.redisKVTTL)
            }
        });
    }
});

router.get('/author/mid/:mid', function (req, res) {
    const key = 'author-mid:' + req.params.mid;
    const cache = db.redis.get(key);
    if (cache) {
        res.send(cache);
    }
    else {
        db.authors.findOne({mid: req.params.mid}, function (error, author) {
            if (error === null) {
                const result = JSON.stringify(author);
                res.send(result);
                db.redis.set(key, result, 'EX', conf.redisKVTTL)
            }
        });
    }
});

router.get('/archive/season_id/:season_id', function (req, res) {
    const key = 'archive-season-id:' + req.params.season_id;
    const cache = db.redis.get(key);
    if (cache) {
        res.send(cache);
    }
    else {
        const result = db.archives.aggregate([{
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{
                        date: '$date'
                    }, {
                        $arrayElemAt: [{
                            $filter:{
                                input: '$archives', cond: {
                                    $eq: ['$$this.season_id', Number(req.params.season_id)]
                                }
                            }
                        }, 0]
                    }]
                }
            }
        }], function (error, archives) {
            if (error === null) {
                res.send(JSON.stringify(archives));
            }
        });
        db.redis.set(key, result, 'EX', conf.redisKVTTL);
    }
});

module.exports = router;
