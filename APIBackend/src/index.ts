import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

require('dotenv').config();

import animeRoutes from './routes/AnimeRoutes';
import episodeRoutes from './routes/EpisodeRoutes';
import genreRoutes from './routes/GenreRoutes';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://moviedb:moviedb123@mongo:27017/moviedb?authSource=moviedb';

const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
};

mongoose
    .connect(MONGO_URL, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: ['http://truongpnxtest.com:3000', 'http://localhost:3000'],
        credentials: true,
    }),
);

// routes

app.use('/anime', animeRoutes);
app.use('/episode', episodeRoutes);
app.use('/genre', genreRoutes);

// [GET] '/'
app.get('/', (req, res) => {
    // res.redirect(`/anime`);
    res.json('Hello from backend');
});

app.get('/favicon.ico', (req: Request, res: Response) => res.status(204).end());

// [GET] /hello
app.get('/hello', (req, res) => {
    console.log('hello chill guy');
    res.json("Hello chill guy, I'm from the backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
