const mongoose = require('mongoose');
const redis = require('redis');

const conf = require('./conf');

mongoose.connect(conf.mongoUrl);

let Schema = mongoose.Schema;

const animes = mongoose.model('animes', new Schema({
    season_id: Number,
    alias: String,
    area: [{id: Number, name: String}],
    cover_url: String,
    danmaku_count: Number,
    episodes: Number,
    evaluate: String,
    favorites: Number,
    is_finish: Boolean,
    media_id: Number,
    pub_time: Date,
    rating: {
        count: Number,
        score: Number
    },
    tags: [{id: Number, name: String}],
    title: String,
    last_long_reviews_cursor: String,
    last_short_reviews_cursor: String,
    top_matches: [{
        media_id: Number,
        similarity: Number
    }]
}));

const authors = mongoose.model('authors', new Schema({
    mid: Number,
    avatar_url: String,
    reviews: [{
        review_id: Number,
        content :String,
        ctime: Date,
        mtime: Date,
        likes: Number,
        score: Number,
        media_id: Number,
        is_long: Boolean,
        title: String,
        is_origin: Boolean,
        is_spoiler: Boolean,
        last_ep_index: String
    }],
    uname: String,
    follow: [Number],
    last_crawl: Date,
    last_analyze: Date,
    top_matches: [{
        mid: Number,
        similarity: Number
    }],
    recommendation: [Number]
}));

const archives = mongoose.model('archives', new Schema({
    date: Date,
    archives: [{
        season_id: Number,
        favorites: Number,
        danmaku_count: Number,
        reviews_count: Number,
        rating: {
            count: Number,
            score: Number
        }
    }]
}));

module.exports.animes = animes;
module.exports.authors = authors;
module.exports.archives = archives;

let client = redis.createClient(conf.redisUrl);
client.set('MAXMEMORY', conf.redisMaxMemory);

module.exports.redis = client;
