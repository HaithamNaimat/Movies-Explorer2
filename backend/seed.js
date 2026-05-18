import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';

dotenv.config();

const moviesData = [
  { title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994, rating: 9.3, genre: "Drama" },
  { title: "The Godfather", director: "Francis Ford Coppola", year: 1972, rating: 9.2, genre: "Crime" },
  { title: "The Dark Knight", director: "Christopher Nolan", year: 2008, rating: 9.0, genre: "Action" },
  { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, rating: 8.9, genre: "Crime" },
  { title: "Forrest Gump", director: "Robert Zemeckis", year: 1994, rating: 8.8, genre: "Drama" },
  { title: "Inception", director: "Christopher Nolan", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { title: "The Matrix", director: "Lana Wachowski", year: 1999, rating: 8.7, genre: "Sci-Fi" },
  { title: "Goodfellas", director: "Martin Scorsese", year: 1990, rating: 8.7, genre: "Crime" },
  { title: "Interstellar", director: "Christopher Nolan", year: 2014, rating: 8.6, genre: "Sci-Fi" },
  { title: "Fight Club", director: "David Fincher", year: 1999, rating: 8.8, genre: "Drama" },
  { title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, rating: 8.6, genre: "Animation" },
  { title: "Parasite", director: "Bong Joon-ho", year: 2019, rating: 8.5, genre: "Thriller" },
  { title: "The Lord of the Rings", director: "Peter Jackson", year: 2003, rating: 9.0, genre: "Fantasy" },
  { title: "Gladiator", director: "Ridley Scott", year: 2000, rating: 8.5, genre: "Action" }
];

const userId = process.argv[2];

if (!userId) {
  console.log('Usage: node seed.js YOUR_USER_ID');
  console.log('After registering and logging in, check the network tab or /api/auth/me response for your _id');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Movie.deleteMany({ createdBy: userId });
    const movies = moviesData.map(m => ({ ...m, createdBy: userId }));
    await Movie.insertMany(movies);
    console.log(`Seeded ${moviesData.length} movies for user ${userId}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
