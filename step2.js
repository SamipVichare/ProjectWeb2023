const readline = require('readline');
const mongoose = require('mongoose'); // Add this line to import mongoose
const db = require('./db'); // Adjust the path based on your project structure

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// MongoDB connection string
const connectionString = "mongodb+srv://vicharesamip:admin@admin.2e0txqd.mongodb.net/sample_mflix";

const initializeAndRun = async () => {
  try {
    // Initialize MongoDB connection
    await db.initialize(connectionString);

    // Prompt user for function choice
    rl.question(
      'Choose a function to execute:\n1. Add New Movie\n2. Get All Movies\n3. Get Movie by ID\n4. Update Movie by ID\n5. Delete Movie by ID\n',
      async (choice) => {
        try {
          switch (choice) {
            case '1':
              const newMovie = await db.addNewMovie({
                title: 'Animal',
                countries: ['India'],
                genres: ['Movie'],
                runtime: 120,
                cast: ['sam'],
                lastupdated: '2015-08-13 18:35:53.927000000',
                languages: ['Hindi'],
                released: new Date('2015-08'),
                directors: ['sam'],
                writers: ['Hardi'],
                awards: {
                  wins: 0,
                  nominations: 1,
                  text: '1 nomination.',
                },
                year: 2022,
                imdb: {
                  rating: 3.8,
                  votes: 5,
                  id: 4881016,
                },
                type: 'movie',
                num_mflix_comments: 0,
              });
              console.log('New Movie Added');
              break;

            case '2':
              const allMovies = await db.getAllMovies(1, 5);
              console.log('All Movies:', allMovies);
              break;

            case '3':
              const movieId = '656f86eddca702cb50dfcc74'; // Replace with an actual movie ID
              const movieById = await db.getMovieById(movieId);
              console.log('Movie by ID:', movieById);
              break;

            case '4':
              const updateMovieId = '656f86eddca702cb50dfcc74'; // Replace with an actual movie ID
              const updatedMovie = await db.updateMovieById({ title: 'Animals' }, updateMovieId);
              console.log('Updated Movie:', updatedMovie);
              break;

            case '5':
              const deleteMovieId = '656f86eddca702cb50dfcc74'; // Replace with an actual movie ID
              const deletedMovie = await db.deleteMovieById(deleteMovieId);
              console.log('Deleted Movie:', deletedMovie);
              break;

            default:
              console.log('Invalid choice.');
          }
        } catch (error) {
          console.error('Error:', error.message);
        } finally {
          // Close the MongoDB connection after running the function
          mongoose.connection.close();
          rl.close();
        }
      }
    );
  } catch (error) {
    console.error('Error initializing MongoDB:', error.message);
  }
};

// Start the script
initializeAndRun();
