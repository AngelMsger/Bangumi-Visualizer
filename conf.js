const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbDatabase = process.env.DB_DATABASE || 'bangumi';
const dbUsername = process.env.DB_USERNAME || 'bangumi';
const dbPassword = process.env.DB_PASSWORD || 'password';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const redisDatabase = process.env.REDIS_DATABASE || 0;
const redisMaxMemory = process.env.REDIS_MAXMEMORY || '1024mb';
const redisKVTTL = process.env.REDIS_KV_TTL || 43200;

const dev = {
    root: '/',
    mongoUrl: 'mongodb://localhost/bangumi',

    redisUrl: 'redis://localhost/0',
    redisMaxMemory: '8192mb',
    redisKVTTL: 43200
};

prod = {
    root: '/bangumi',
    mongoUrl: 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbDatabase,

    redisUrl: 'redis://' + redisHost + ':' + redisPort + '/' + redisDatabase,
    redisMaxMemory: redisMaxMemory,
    redisKVTTL: redisKVTTL
};

module.exports = prod;
