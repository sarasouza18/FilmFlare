const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({ node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200' });

class ElasticsearchClient {
  static async indexMovie(movie) {
    await client.index({
      index: 'movies',
      id: movie.id,
      body: movie,
    });
    await client.indices.refresh({ index: 'movies' });
  }

  static async updateMovie(movie) {
    await client.update({
      index: 'movies',
      id: movie.id,
      body: {
        doc: movie,
      },
    });
  }

  static async deleteMovie(id) {
    await client.delete({
      index: 'movies',
      id: id,
    });
  }

  static async searchMovies(filters) {
    const { title, genre, releaseYear } = filters;
    const must = [];

    if (title) {
      must.push({
        match: { title: title },
      });
    }

    if (genre) {
      must.push({
        match: { genre: genre },
      });
    }

    if (releaseYear) {
      must.push({
        match: { releaseYear: releaseYear },
      });
    }

    const { body } = await client.search({
      index: 'movies',
      body: {
        query: {
          bool: {
            must: must.length > 0 ? must : { match_all: {} },
          },
        },
      },
    });

    return body.hits.hits.map(hit => hit._source);
  }
}

module.exports = ElasticsearchClient;
