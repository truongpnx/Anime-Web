const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://moviedb:moviedb123@mongo:27017/moviedb?authSource=moviedb';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

// [GET] '/'
app.get('/', (req, res) => {
    res.redirect(`/api/hello`);
});

// [GET] /api/hello
app.get('/api/hello', (req, res) => {
    console.log('hello');
    res.json('Hello from the backend!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});