"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteViewHistory = exports.updateViewHistory = exports.addViewHistory = exports.getViewHistories = void 0;
const ViewHistory_1 = __importDefault(require("../models/ViewHistory"));
const mongoose_1 = __importDefault(require("mongoose"));
const getViewHistories = async (req, res) => {
    try {
        const { userId, episodeId } = req.query;
        if (userId || episodeId) {
            const query = {};
            if (userId)
                query.userId = userId;
            if (episodeId)
                query.episodeId = episodeId;
            const viewHistories = await ViewHistory_1.default.find(query);
            return res.json(viewHistories);
        }
        res.status(400).json({ error: 'Empty query' });
    }
    catch (error) {
        console.error('Error get view history', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getViewHistories = getViewHistories;
const addViewHistory = async (req, res) => {
    try {
        const histpry = new ViewHistory_1.default(req.body);
        const savedHistory = await histpry.save();
        res.json(savedHistory);
    }
    catch (error) {
        console.error('Error add view history', error);
        res.status(400).json({ error: error.message });
    }
};
exports.addViewHistory = addViewHistory;
const updateViewHistory = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.historyId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }
        const updatedViewHistory = await ViewHistory_1.default.findByIdAndUpdate(req.params.historyId, req.body, { new: true });
        res.json(updatedViewHistory);
    }
    catch (error) {
        console.error('Error update view history', error);
        res.status(400).json({ error: error.message });
    }
};
exports.updateViewHistory = updateViewHistory;
const deleteViewHistory = async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.historyId)) {
            return res.status(400).json({ error: 'Invalid comment Id' });
        }
        const deletedViewHistory = await ViewHistory_1.default.findByIdAndDelete(req.params.historyId);
        res.json(deletedViewHistory);
    }
    catch (error) {
        console.error('Error delete view history', error);
        res.status(400).json({ error: error.message });
    }
};
exports.deleteViewHistory = deleteViewHistory;
