const express = require('express');
const MovieController = require('../controllers/MovieController');

const router = express.Router();

router.get('/', MovieController.getMovies);
router.post('/', MovieController.addMovie);
router.put('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie);

module.exports = router;
