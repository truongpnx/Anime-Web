"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const animeDetailsSchema = new mongoose_1.default.Schema({
    anime: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true,
    },
    secondName: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        required: true,
    },
    animeType: {
        type: String,
        default: null,
    },
    studios: {
        type: String,
        default: null,
    },
    airedDate: {
        type: {
            from: {
                type: Date,
                default: Date.now,
            },
            to: {
                type: Date,
                validate: {
                    validator: function (value) {
                        return !value || value >= this.airedDate?.from;
                    },
                    message: 'The "to" date must not be less than the "from" date.',
                },
            },
        },
        required: true,
        default: () => ({ from: Date.now(), to: null }),
    },
    rates: {
        type: {
            avg: {
                type: Number,
                required: true,
                default: 0,
                validate: {
                    validator: (value) => value >= 0,
                    message: 'Average rate score must be positive',
                },
            },
            quantity: {
                type: Number,
                required: true,
                default: 0,
                validate: {
                    validator: (value) => value >= 0,
                    message: 'Average rate quantity must be positive',
                },
            },
        },
        required: true,
        default: () => ({ avg: 0, quantity: 0 }),
    },
    quality: {
        type: String,
        required: true,
        default: 'HD',
    }, // video quality
    duration: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
            message: 'Duration must be positive',
        },
    }, // average episode duration in second
});
const AnimeDetails = mongoose_1.default.model('AnimeDetails', animeDetailsSchema);
exports.default = AnimeDetails;
