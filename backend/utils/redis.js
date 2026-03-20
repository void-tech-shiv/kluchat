class RedisMock {
  constructor() {
    this.sets = {};
    this.lists = {};
  }

  on(event, cb) {
    if (event === 'connect') {
      setTimeout(() => cb(), 100);
    }
  }

  async sadd(key, value) {
    if (!this.sets[key]) this.sets[key] = new Set();
    this.sets[key].add(value);
  }

  async smembers(key) {
    return this.sets[key] ? Array.from(this.sets[key]) : [];
  }

  async srem(key, value) {
    if (this.sets[key]) {
      this.sets[key].delete(value);
    }
  }

  async rpush(key, value) {
    if (!this.lists[key]) this.lists[key] = [];
    this.lists[key].push(value);
  }

  async lrange(key, start, end) {
    if (!this.lists[key]) return [];
    if (end === -1) return this.lists[key].slice(start);
    return this.lists[key].slice(start, end + 1);
  }

  async expire(key, seconds) {
    // Basic mock, not actually expiring in this implementation
    return 1;
  }
}

const Redis = require('ioredis');

const isDev = process.env.NODE_ENV !== 'production';
const redis = isDev ? new RedisMock() : new Redis(process.env.REDIS_URL);

redis.on('connect', () => console.log('Connected to Redis successful'));

module.exports = redis;
