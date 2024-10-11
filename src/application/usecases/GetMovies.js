const MovieRepository = require('../../domain/repositories/MovieRepository');
const ElasticsearchClient = require('../../infrastructure/search/ElasticsearchClient');
const RedisClient = require('../../infrastructure/cache/RedisClient');

class GetMovies {
  static async execute(filters) {
    const cacheKey = `movies:${JSON.stringify(filters)}`;
    
    // Check cache first
    const cachedResult = await RedisClient.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

    // Search in Elasticsearch
    const movies = await ElasticsearchClient.searchMovies(filters);

    // Cache the result
    await RedisClient.set(cacheKey, JSON.stringify(movies), 'EX', 3600); // 1 hour TTL

    return movies;
  }
}

module.exports = GetMovies;
