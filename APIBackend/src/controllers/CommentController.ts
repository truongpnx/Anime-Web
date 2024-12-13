import { Request, Response } from 'express';
import Comment, { CommentDocument } from '../models/Comment';
import mongoose from 'mongoose';

export const getComments = async (req: Request, res: Response) => {
    try {
        const { userId, animeId, episodeId } = req.query;

        if (userId || animeId || episodeId) {
            const query: Partial<Record<keyof CommentDocument, string>> = {};
            if (userId) query.userId = userId as string;
            if (animeId) query.animeId = animeId as string;
            if (episodeId) query.episodeId = episodeId as string;

            const comments = await Comment.find(query);
            return res.json(comments);
        }

        res.status(400).json({ error: 'Empty query' });
    } catch (error) {
        console.error('Error get comment', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addComment = async (req: Request, res: Response) => {
    try {
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (error) {
        console.error('Error add comment', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.commentId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }

        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
        res.json(updatedComment);
    } catch (error) {
        console.error('Error update comment', error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        if (!mongoose.isValidObjectId(req.params.commentId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }

        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
        res.json(deletedComment);
    } catch (error) {
        console.error('Error delete comment', error);
        res.status(400).json({ error: (error as Error).message });
    }
};
