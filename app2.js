const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const movieService = require('./movieService');
const db = require('./database');
const helpers = require('./helpers'); // Import the custom helper

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace this with your actual MongoDB connection string
const connectionString = "mongodb+srv://vicharesamip:admin@admin.2e0txqd.mongodb.net/sample_mflix";

// Use a promise to start the server after the connection is established
db.initialize(connectionString)
  .then(() => {
    // Set up Handlebars as the template engine
    app.engine('hbs', exphbs.engine({
      defaultLayout: 'main',
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
      helpers: require('./helpers') 
    }));
    app.set('view engine', 'hbs');

    // Define the route for the form
    app.get('/search', (req, res) => {
      res.render('searchForm');
    });

    // Define the route for handling the form submission
    app.post('/search', async (req, res) => {
      try {
        const page = parseInt(req.body.page) || 1;
        const perPage = parseInt(req.body.perPage) || 10;
        const title = req.body.title || '';

        // Use the getAllMovies function from the movieService module
        const movies = await movieService.getAllMovies(page, perPage, title);
        console.log(movies);
        // Render the results using a Handlebars template
        res.render('searchResults', { movies });
      } catch (error) {
        console.error('Error getting Movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB. Check your connection string.');
  });
