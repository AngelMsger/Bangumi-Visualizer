const express = require('express');
const conf = require('../conf');
const db = require('../db');

const router = express.Router();

/* GET api listing. */
router.get('/anime/season_id/:season_id', function(req, res) {
    const seasonId = parseInt(req.params.season_id);
    if (seasonId) {
        const key = 'anime-season-id:' + seasonId;
        db.redis.get(key, function (error, value) {
            if (!error && value) {
                res.send(JSON.parse(value));
            }
            else {
                db.animes.findOne({season_id: seasonId}, function (error, anime) {
                    if (error === null) {
                        res.send(anime);
                        db.redis.set(key, JSON.stringify(anime), 'EX', conf.redisKVTTL);
                    }
                });
            }
        });
    }
});

router.get('/anime/media_id/:media_id', function(req, res) {
    const mediaId = parseInt(req.params.season_id);
    if (mediaId) {
        const key = 'anime-media-id:' + mediaId;
        db.redis.get(key, function (error, value) {
            if (!error && value) {
                res.send(JSON.parse(value));
            }
            else {
                db.animes.findOne({media_id: mediaId}, function (error, anime) {
                    if (error === null) {
                        res.send(anime);
                        db.redis.set(key, JSON.stringify(anime), 'EX', conf.redisKVTTL)
                    }
                });
            }
        });
    }
});

router.get('/author/mid/:mid', function (req, res) {
    const mId = parseInt(req.params.mid);
    if (mId) {
        const key = 'author-mid:' + mId;
        db.redis.get(key, function (error, value) {
            if (!error && value) {
                res.send(JSON.parse(value));
            }
            else {
                db.authors.findOne({mid: mId}, function (error, author) {
                    if (error === null) {
                        res.send(author);
                        db.redis.set(key, JSON.stringify(author), 'EX', conf.redisKVTTL)
                    }
                });
            }
        });
    }
});

router.get('/archive/season_id/:season_id', function (req, res) {
    const seasonId = parseInt(req.params.season_id);
    if (seasonId) {
        const key = 'archive-season-id:' + seasonId;
        db.redis.get(key, function (error, value) {
            if (!error && value) {
                res.send(JSON.parse(value));
            }
            else {
                db.archives.aggregate([{
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [{
                                date: '$date'
                            }, {
                                $arrayElemAt: [{
                                    $filter:{
                                        input: '$archives', cond: {
                                            $eq: ['$$this.season_id', seasonId]
                                        }
                                    }
                                }, 0]
                            }]
                        }
                    }
                }], function (error, archives) {
                    if (error === null) {
                        res.send(archives);
                        db.redis.set(key, JSON.stringify(archives), 'EX', conf.redisKVTTL);
                    }
                });
            }
        });
    }
});

module.exports = router;
