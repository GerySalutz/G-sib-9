const express = require("express");
const {
  getMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovie,
} = require("../controller/movieController");
const { authMiddleware } = require("../middleware/authMiddleware");
const movieRouter = express.Router();

movieRouter.get("/movies", getMovies, authMiddleware);
movieRouter.get("/movies/:id", getMovieById, authMiddleware);
movieRouter.post("/movies", addMovie, authMiddleware);
movieRouter.put("/movies/:id", updateMovieById, authMiddleware);
movieRouter.delete("/movies/:id", deleteMovie, authMiddleware);

module.exports = movieRouter;
