/** @type {import('mongoose')} */
const mongoose = require('mongoose');

const viewHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        episodeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Episode',
        },
        watchTime: {
            type: Number,
            default: 0,
            validate: {
                validator: function (value) {
                    return value >= 0;
                },
                message: 'Watch time cannot be negative.',
            },
        },
    },
    { timestamps: true },
);

viewHistorySchema.index({ userId: 1, episodeId: 1 }, { unique: true });

const ViewHistory = mongoose.model('ViewHistory', viewHistorySchema);

module.exports = ViewHistory;
