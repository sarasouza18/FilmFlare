const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.connect();

class RedisClientWrapper {
  static async get(key) {
    return await redisClient.get(key);
  }

  static async set(key, value, ...args) {
    return await redisClient.set(key, value, ...args);
  }

  static async del(key) {
    return await redisClient.del(key);
  }
}

module.exports = RedisClientWrapper;
