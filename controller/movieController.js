const pool = require("../db");

const getMovies = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;

    const offset = (page - 1) * limit;

    const query = {
      text: `SELECT * FROM movies ORDER BY id ASC OFFSET ${offset} LIMIT ${limit}`,
    };

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      err: err,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;

    const query = {
      text: "SELECT * FROM movies WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      err: err,
    });
  }
};

const addMovie = async (req, res, next) => {
  try {
    const { id, title, genres, year } = req.body;

    if (!id || !title || !genres || !year) {
      res.status(400).json({
        message: "Invalid id, title, genres or year",
      });
    }

    const query = {
      text: "INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)",
      values: [id, title, genres, year],
    };

    const result = await pool.query(query);

    res.status(201).json({
      message: "Movie Added",
      movie: result.rows[0],
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      err: err,
    });
  }
};

const updateMovieById = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, genres, year } = req.body;

    const query = {
      text: "UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4",
      values: [title, genres, year, id],
    };

    const result = await pool.query(query);

    res.status(200).json({
      message: "Update Successfull",
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      err: err,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    const query = {
      text: "DELETE FROM movies WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    res.status(200).json({
      message: "Delete Successfull",
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      err: err,
    });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovie,
};
