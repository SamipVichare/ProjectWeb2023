const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  countries: [String],
  genres: [String],
  runtime: Number,
  cast: [String],
  title: String,
  lastupdated: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  type: String,
  num_mflix_comments: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

const initialize = async (connectionString) => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Initialize the "Movie" model with the "movies" collection
    mongoose.model('Movie', movieSchema);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const addNewMovie = async (data) => {
  try {
    const newMovie = new Movie(data);
    await newMovie.save();
    console.log('New movie added:', newMovie);
    return newMovie;
  } catch (error) {
    console.error('Error adding new movie:', error.message);
    throw error;
  }
};

const getAllMovies = async (page, perPage, title) => {
  try {
    const query = title ? { title: { $regex: new RegExp(title, 'i') } } : {};
    const movies = await Movie.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ _id: 'asc' });
    return movies;
  } catch (error) {
    console.error('Error getting all movies:', error.message);
    throw error;
  }
};

const getMovieById = async (Id) => {
  try {
    const movie = await Movie.findById(Id);
    return movie;
  } catch (error) {
    console.error('Error getting movie by ID:', error.message);
    throw error;
  }
};

const updateMovieById = async (data, Id) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(Id, data, { new: true });
    console.log('Movie updated:', updatedMovie);
    return updatedMovie;
  } catch (error) {
    console.error('Error updating movie by ID:', error.message);
    throw error;
  }
};

const deleteMovieById = async (Id) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(Id);
    console.log('Movie deleted:', deletedMovie);
    return deletedMovie;
  } catch (error) {
    console.error('Error deleting movie by ID:', error.message);
    throw error;
  }
};

module.exports = {
  initialize,
  addNewMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
