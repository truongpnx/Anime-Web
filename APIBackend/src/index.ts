import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './controllers/PassportController';

require('dotenv').config();

import apiRoutes from './routes/apis';
import viewRoutes from './routes/views';
import path from 'path';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://moviedb:moviedb123@mongo:27017/moviedb?authSource=moviedb';
const API_VERSION_PATH = process.env.API_VERSION_PATH || '/v1/api';

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
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 60 * 1000, // 30m
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
        },
        resave: false,
        store: MongoStore.create({
            mongoUrl: MONGO_URL,
        }),
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// ejs setup

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

// routes

app.use(API_VERSION_PATH, apiRoutes);
app.use('/views', viewRoutes);
app.use('/static', express.static(path.join(__dirname, '/public')));

// [GET] '/'
app.get('/', (req, res) => {
    res.redirect('/views/auth/login');
});

app.get('/favicon.ico', (req: Request, res: Response) => res.status(204).end());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
