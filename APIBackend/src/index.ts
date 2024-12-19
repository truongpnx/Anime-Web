import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './controllers/PassportController';

require('dotenv').config();

import animeRoutes from './routes/AnimeRoutes';
import genreRoutes from './routes/GenreRoutes';
import userRoutes from './routes/UserRoutes';
import commentRoutes from './routes/CommentRoutes';
import viewHistoryRoutes from './routes/ViewHistoryRoutes';
import socialAuthRoutes from './routes/AuthRoutes';

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

// routes

app.use('/anime', animeRoutes);
app.use('/genre', genreRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);
app.use('/view-history', viewHistoryRoutes);
app.use('/oauth', socialAuthRoutes);

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
