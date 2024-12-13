"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const AnimeRoutes_1 = __importDefault(require("./routes/AnimeRoutes"));
const GenreRoutes_1 = __importDefault(require("./routes/GenreRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const CommentRoutes_1 = __importDefault(require("./routes/CommentRoutes"));
const ViewHistoryRoutes_1 = __importDefault(require("./routes/ViewHistoryRoutes"));
const MONGO_URL = process.env.MONGO_URL || 'mongodb://moviedb:moviedb123@mongo:27017/moviedb?authSource=moviedb';
const options = {
// useNewUrlParser: true,
// useUnifiedTopology: true,
};
mongoose_1.default
    .connect(MONGO_URL, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://truongpnxtest.com:3000', 'http://localhost:3000'],
    credentials: true,
}));
// routes
app.use('/anime', AnimeRoutes_1.default);
app.use('/genre', GenreRoutes_1.default);
app.use('/user', UserRoutes_1.default);
app.use('/comment', CommentRoutes_1.default);
app.use('/view-history', ViewHistoryRoutes_1.default);
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
