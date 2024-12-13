import { Request, Response } from 'express';
import ViewHistory, { ViewHistoryDocument } from '../models/ViewHistory';
import mongoose from 'mongoose';

export const getViewHistories = async (req: Request, res: Response) => {
    try {
        const { userId, episodeId } = req.query;
        if (userId || episodeId) {
            const query: Partial<Record<keyof ViewHistoryDocument, string>> = {};
            if (userId) query.userId = userId as string;
            if (episodeId) query.episodeId = episodeId as string;

            const viewHistories = await ViewHistory.find(query);
            return res.json(viewHistories);
        }
        res.status(400).json({ error: 'Empty query' });
    } catch (error) {
        console.error('Error get view history', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addViewHistory = async (req: Request, res: Response) => {
    try {
        const histpry = new ViewHistory(req.body);
        const savedHistory = await histpry.save();
        res.json(savedHistory);
    } catch (error) {
        console.error('Error add view history', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateViewHistory = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.historyId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }

        const updatedViewHistory = await ViewHistory.findByIdAndUpdate(req.params.historyId, req.body, { new: true });
        res.json(updatedViewHistory);
    } catch (error) {
        console.error('Error update view history', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteViewHistory = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.historyId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }

        const deletedViewHistory = await ViewHistory.findByIdAndDelete(req.params.historyId);
        res.json(deletedViewHistory);
    } catch (error) {
        console.error('Error delete view history', error);
        res.status(400).json({ error: (error as Error).message });
    }
};
