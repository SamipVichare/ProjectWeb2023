// index.js
const express = require('express');
const cors = require('cors');
const { initialize } = require('./db');
const Movie = require('./models/mov');

const app = express();
const port = 3000;
const connectionString = 'mongodb+srv://vicharesamip:admin@admin.2e0txqd.mongodb.net/sample_mflix';

app.use(cors());

// Initialize MongoDB connection
initialize(connectionString)
  .then(() => {
    // Start Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize MongoDB:', error.message);
  });

// Define routes and logic to interact with MongoDB
// ...

