const mongoose = require('mongoose');

module.exports = {
  initialize: (uri) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
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
};
