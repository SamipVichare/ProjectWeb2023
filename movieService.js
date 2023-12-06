const Movie = require('./models/Movie');

module.exports = {
  initialize: (uri) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      const db = mongoose.connection;

      db.on('error', (err) => {
        console.error('Connection error:', err);
        reject(err);
      });

      db.once('open', () => {
        console.log('Connected to MongoDB Atlas');
        resolve();
      });
    });
  },

  addNewMovie: (data) => {
    return new Promise((resolve, reject) => {
      new Movie(data).save()
        .then(movie => resolve(movie))
        .catch(error => reject(error));
    });
  },

  getAllMovies: (page, perPage, title) => {
    return new Promise((resolve, reject) => {
      const query = title ? { title: { $regex: title, $options: 'i' } } : {};

      Movie.find(query)
        .sort({ Movie_id: 1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec()
        .then(movies => resolve(movies))
        .catch(error => reject(error));
    });
  },

  getMovieById: (Id) => {
    return Movie.findById(Id).exec();
  },

  updateMovieById: (data, Id) => {
    return Movie.findByIdAndUpdate(Id, data, { new: true }).exec();
  },

  deleteMovieById: (Id) => {
    return Movie.findByIdAndDelete(Id).exec();
  },
};
