/** @type {import('express')} */
const express = require('express');
const router = express.Router();
const Episode = require('../models/Episode');
const { default: mongoose } = require('mongoose');
const Anime = require('../models/Anime');

/**
 * [GET] /:animeId
 * Description: Fetch a specific episode or all episode of an anime by `animeId` and `episodeId`.
 * Query Parameters:
 *   - id (string): The unique ID of the episode.
 * URL Parameters:
 *   - animeId (string): The unique ID of the anime.
 */
router.get('/:animeId', async (req, res) => {
    try {
        const id = req.query.id;
        const animeId = req.params.animeId;

        if (!animeId) {
            return res.status(400).json({ error: 'animeId are required' });
        }

        if (id) {
            const episode = await Episode.findOne({
                _id: id,
                animeId: animeId,
            });

            if (!episode) {
                return res.status(404).json({ error: 'Episode not found' });
            }

            console.log(`Episode fetched successfully by animeId: ${animeId}`);
            return res.json(episode);
        }

        const episodes = await Episode.find({ animeId: animeId });
        if (!episodes) {
            return res.status(404).json({ error: 'Episodes not found' });
        }
        console.log(`All episodes fetched successfully by animeId: ${animeId}`);
        return res.json(episodes);
    } catch (error) {
        console.error('Fail to fetch anime(s)', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * [POST] /add
 * Description: Add a specific episode for an anime by `animeId`.
 * Query Parameters:
 *   - animeId (string): The unique ID of the anime.
 */
router.post('/add', async (req, res) => {
    try {
        const animeId = req.query.animeId;
        const data = req.body;

        if (!animeId) {
            return res.status(400).json({ error: 'animeId is required' });
        }

        const anime = await Anime.findById(animeId);

        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        const episode = new Episode({
            ...data,
            animeId: animeId,
            episodeNum: anime.episodesNum + 1,
        });

        console.log(anime);
        console.log(episode);

        await episode.save();

        console.log(`Add episode successfully to animeId: ${animeId}`);
        res.status(200).json({
            message: 'Episode added successfully',
            episode: episode,
        });
    } catch (error) {
        console.error('Fail to add episode', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * [POST] /update
 * Description: Update a specific episode for an anime by `animeId` and `episodeId`.
 * Query Parameters:
 *   - id (string): The unique ID of the anime episode.
 *   - animeId (string): The unique ID of the anime.
 */
router.post('/update', async (req, res) => {
    try {
        const animeId = req.query.animeId;
        const episodeId = req.query.id;
        const updates = req.body;

        if (!animeId || !id) {
            return res.status(400).json({ error: 'animeId and episodeId are required' });
        }

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(animeId)) {
            return res.status(400).json({ error: 'Invalid Anime ID or Invalid Episode ID' });
        }

        const updatedEpisode = await Episode.findOneAndUpdate(
            {
                _id: episodeId,
                animeId: animeId,
            },
            updates,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedEpisode) {
            return res.status(404).json({ error: 'Episode not found' });
        }

        console.log(`Update episode (id: ${episodeId}) successfully to animeId: ${animeId}`);
        res.status(200).json({
            message: 'Episode updated successfully',
            episode: updatedEpisode,
        });
    } catch (error) {
        console.error('Fail to update episode', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * [Delete] /
 * Description: Deleta a specific episode for an anime by `episodeId`.
 * Query Parameters:
 *   - id (string): The unique ID of the anime episode.
 */
router.delete('/', async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ error: 'episodeId are required' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Episode ID' });
        }

        const episode = await Episode.findByIdAndDelete(id);
        console.log(`Delete episode successfully`);
        res.status(200).json({ message: `Episode deleted successfully`, episode: episode });
    } catch (error) {
        console.error('Delete epsidoe error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
