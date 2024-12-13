"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.addComment = exports.getComments = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const mongoose_1 = __importDefault(require("mongoose"));
const getComments = async (req, res) => {
    try {
        const { userId, animeId, episodeId } = req.query;
        if (userId || animeId || episodeId) {
            const query = {};
            if (userId)
                query.userId = userId;
            if (animeId)
                query.animeId = animeId;
            if (episodeId)
                query.episodeId = episodeId;
            const comments = await Comment_1.default.find(query);
            return res.json(comments);
        }
        res.status(400).json({ error: 'Empty query' });
    }
    catch (error) {
        console.error('Error get comment', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getComments = getComments;
const addComment = async (req, res) => {
    try {
        const comment = new Comment_1.default(req.body);
        const savedComment = await comment.save();
        res.json(savedComment);
    }
    catch (error) {
        console.error('Error add comment', error);
        res.status(400).json({ error: error.message });
    }
};
exports.addComment = addComment;
const updateComment = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.commentId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }
        const updatedComment = await Comment_1.default.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
        res.json(updatedComment);
    }
    catch (error) {
        console.error('Error update comment', error);
        res.status(400).json({ error: error.message });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.commentId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }
        const deletedComment = await Comment_1.default.findByIdAndDelete(req.params.commentId);
        res.json(deletedComment);
    }
    catch (error) {
        console.error('Error delete comment', error);
        res.status(400).json({ error: error.message });
    }
};
exports.deleteComment = deleteComment;
