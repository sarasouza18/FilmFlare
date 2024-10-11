const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Use movie routes
app.use('/movies', movieRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to FilmFlare API!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FilmFlare is running on port ${PORT}`);
});
