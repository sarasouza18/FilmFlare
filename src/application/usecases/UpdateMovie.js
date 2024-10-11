const MovieRepository = require('../../domain/repositories/MovieRepository');
const ElasticsearchClient = require('../../infrastructure/search/ElasticsearchClient');
const RedisClient = require('../../infrastructure/cache/RedisClient');

class UpdateMovie {
  static async execute(id, movieData) {
    // Update movie in DynamoDB
    const updatedMovie = await MovieRepository.update(id, movieData);

    // Update in Elasticsearch
    await ElasticsearchClient.updateMovie(updatedMovie);

    // Invalidate relevant cache
    await RedisClient.del('movies:all');
    await RedisClient.del(`movies:${id}`);

    return updatedMovie;
  }
}

module.exports = UpdateMovie;
