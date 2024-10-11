const DynamoDBClient = require('../../infrastructure/database/DynamoDBClient');

class MovieRepository {
  static async add(movieData) {
    const movie = {
      id: DynamoDBClient.generateId(),
      ...movieData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await DynamoDBClient.putItem('Movies', movie);
    return movie;
  }

  static async getAll() {
    return await DynamoDBClient.scan('Movies');
  }

  static async update(id, movieData) {
    const updatedMovie = {
      ...movieData,
      updatedAt: new Date().toISOString(),
    };
    await DynamoDBClient.updateItem('Movies', id, updatedMovie);
    return updatedMovie;
  }

  static async delete(id) {
    await DynamoDBClient.deleteItem('Movies', id);
  }

  static async getById(id) {
    return await DynamoDBClient.getItem('Movies', id);
  }
}

module.exports = MovieRepository;
