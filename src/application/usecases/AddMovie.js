const MovieRepository = require('../../domain/repositories/MovieRepository');
const ElasticsearchClient = require('../../infrastructure/search/ElasticsearchClient');
const RedisClient = require('../../infrastructure/cache/RedisClient');

class AddMovie {
  static async execute(movieData) {
    // Add movie to DynamoDB
    const newMovie = await MovieRepository.add(movieData);

    // Index movie in Elasticsearch
    await ElasticsearchClient.indexMovie(newMovie);

    // Invalidate relevant cache
    await RedisClient.del('movies:all');

    return newMovie;
  }
}

module.exports = AddMovie;
