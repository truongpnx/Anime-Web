"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const viewHistorySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    episodeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
viewHistorySchema.index({ userId: 1, episodeId: 1 }, { unique: true });
const ViewHistory = mongoose_1.default.model('ViewHistory', viewHistorySchema);
exports.default = ViewHistory;
