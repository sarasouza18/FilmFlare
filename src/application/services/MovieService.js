const AddMovie = require('../usecases/AddMovie');
const GetMovies = require('../usecases/GetMovies');
const UpdateMovie = require('../usecases/UpdateMovie');
const DeleteMovie = require('../usecases/DeleteMovie');

class MovieService {
    static async getMovies(filters) {
        return await GetMovies.execute(filters);
    }

    static async addMovie(movieData) {
        return await AddMovie.execute(movieData);
    }

    static async updateMovie(id, movieData) {
        return await UpdateMovie.execute(id, movieData);
    }

    static async deleteMovie(id) {
        return await DeleteMovie.execute(id);
    }
}

module.exports = MovieService;
