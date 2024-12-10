import express, { Request, Response } from 'express';
const router = express.Router();
import Anime from '../models/Anime';
import { normalizeAnimeName } from '../helper/stringHelper';
import { default as mongoose } from 'mongoose';

// [GET] '/?id='
router.get('/', async (req: Request, res: Response) => {
    try {
        let id = req.query.id;

        if (mongoose.isValidObjectId(id)) {
            const anime = await Anime.findById(id);
            return res.json(anime);
        }

        const animes = await Anime.find();
        res.json(animes);
    } catch (error) {
        console.error('Fetch animes error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// [GET] /:name
router.get('/:name', async (req, res) => {
    try {
        let name = normalizeAnimeName(req.params.name);

        const anime = await Anime.findOne({ name: name });

        if (anime) {
            console.log('Find anime success');
            return res.status(200).json(anime);
        }

        res.status(404).json('Not found anime');
    } catch (error) {
        console.error('Not found anime', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// [POST] /add
router.post('/add', async (req, res) => {
    try {
        let data = req.body;

        if (!data.name) {
            return res.status(400).json({ error: 'Empty anime name' });
        }

        let name = normalizeAnimeName(data.name);

        let anime = await Anime.findOne({ name: name });

        if (anime) {
            console.log('Existed anime');
            res.status(409).json({ error: 'Existed anime', anime: anime });
            return;
        }

        anime = new Anime({
            ...data,
            name: name,
            displayName: data.name,
            isEnded: Boolean(data.isEnded),
        });

        await anime.save();

        console.log('Add anime success');
        res.status(200).json({
            message: 'Anime added successfully',
            anime: anime,
        });
    } catch (error) {
        console.error('Fail to add anime', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// [POST] /update?id=
router.post('/update', async (req, res) => {
    try {
        const id = req.query.id;
        let updates = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }

        if (updates.name !== undefined) {
            updates.displayName = updates.name;
            updates.name = normalizeAnimeName(updates.name);
        }

        updates.isEnded = Boolean(updates.isEnded);

        const updatedAnime = await Anime.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedAnime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        res.status(200).json({
            message: 'Anime updated successfully',
            anime: updatedAnime,
        });
    } catch (error) {
        console.error('Update anime error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// [DELETE] /?id=
router.delete('/', async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            return res.status(400).json('Empty id');
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid Anime ID' });
        }

        const anime = await Anime.findByIdAndDelete(id);
        console.log('Delete anime successfully');
        res.status(200).json({ message: 'Anime deleted successfully', anime: anime });
    } catch (error) {
        console.error('Delete error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
