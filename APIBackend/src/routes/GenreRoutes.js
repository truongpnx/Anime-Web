const express = require('express');
const Genre = require('../models/Genre');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();

        res.json(genres);
    } catch (error) {
        console.error('Fetch all genre error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const name = req.body.name;

        if (!name || name === '') {
            return res.status(400).json({ error: 'Empty genre name' });
        }

        const genre = await Genre.create({ name: name });

        res.json({ message: 'Add genre completed', genre: genre });
    } catch (error) {
        console.error('Fetch all genre error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/', async (req, res) => {
    try {
        const name = req.query.name;

        if (!name || name === '') {
            return res.status(400).json({ error: 'Empty genre name' });
        }

        const genre = await Genre.findOneAndDelete({ name: name });

        res.json({ message: 'Delete genre completed', genre: genre });
    } catch (error) {
        console.error('Fetch all genre error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
