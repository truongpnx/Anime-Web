"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Anime_1 = __importDefault(require("./Anime"));
const commentSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'User' },
    animeId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'Anime' },
    episodeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Episode' },
    createAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
}, { timestamps: true });
commentSchema.post('save', (doc) => __awaiter(void 0, void 0, void 0, function* () {
    yield Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { numComments: 1 } });
}));
commentSchema.post('deleteOne', (doc) => __awaiter(void 0, void 0, void 0, function* () {
    yield Anime_1.default.findByIdAndUpdate(doc.animeId, { $inc: { numComments: -1 } });
}));
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
