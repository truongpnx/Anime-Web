const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const animeRoutes = require('./routes/AnimeRoutes');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://moviedb:moviedb123@mongo:27017/moviedb?authSource=moviedb';

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

// [GET] '/'
app.get('/', (req, res) => {
    // res.redirect(`/anime`);
    res.json('Hello from backend');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// [GET] /hello
app.get('/hello', (req, res) => {
    console.log('hello chill guy');
    res.json("Hello chill guy, I'm from the backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
