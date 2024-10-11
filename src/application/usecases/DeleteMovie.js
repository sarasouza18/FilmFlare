const MovieRepository = require('../../domain/repositories/MovieRepository');
const ElasticsearchClient = require('../../infrastructure/search/ElasticsearchClient');
const RedisClient = require('../../infrastructure/cache/RedisClient');

class DeleteMovie {
  static async execute(id) {
    // Delete movie from DynamoDB
    await MovieRepository.delete(id);

    // Delete from Elasticsearch
    await ElasticsearchClient.deleteMovie(id);

    // Invalidate relevant cache
    await RedisClient.del('movies:all');
    await RedisClient.del(`movies:${id}`);
  }
}

module.exports = DeleteMovie;
