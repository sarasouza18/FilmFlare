const MovieService = require('../../application/services/MovieService');

class MovieController {
    // Fetch all movies with optional filters
    static async getMovies(req, res) {
        try {
            const filters = req.query;
            const movies = await MovieService.getMovies(filters);
            res.status(200).json(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).json({ message: 'Error fetching movies.' });
        }
    }

    // Add a new movie
    static async addMovie(req, res) {
        try {
            const movieData = req.body;
            const newMovie = await MovieService.addMovie(movieData);
            res.status(201).json(newMovie);
        } catch (error) {
            console.error('Error adding movie:', error);
            res.status(500).json({ message: 'Error adding movie.' });
        }
    }

    // Update movie details
    static async updateMovie(req, res) {
        try {
            const { id } = req.params;
            const movieData = req.body;
            const updatedMovie = await MovieService.updateMovie(id, movieData);
            res.status(200).json(updatedMovie);
        } catch (error) {
            console.error('Error updating movie:', error);
            res.status(500).json({ message: 'Error updating movie.' });
        }
    }

    // Delete a movie
    static async deleteMovie(req, res) {
        try {
            const { id } = req.params;
            await MovieService.deleteMovie(id);
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting movie:', error);
            res.status(500).json({ message: 'Error deleting movie.' });
        }
    }
}

module.exports = MovieController;
