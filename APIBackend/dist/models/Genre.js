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
const genreSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
});
// document.deleteOne()
genreSchema.pre('deleteOne', { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Deleting doc!');
        try {
            yield Anime_1.default.updateMany({ genres: this._id }, { $pull: { genres: this._id } });
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
genreSchema.pre(['deleteOne', 'findOneAndDelete'], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const genreId = yield Genre.findOne(this.getQuery()).select('_id');
            yield Anime_1.default.updateMany({ genres: genreId }, { $pull: { genres: { $in: [genreId] } } });
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
genreSchema.pre('deleteMany', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const genresToDelete = this.getQuery();
            const genres = yield Genre.find(genresToDelete).select('_id');
            const genreIds = genres.map((genre) => genre._id);
            // Update all Anime documents to remove references to these genres
            yield Anime_1.default.updateMany({ genres: { $in: genreIds } }, { $pull: { genres: { $in: genreIds } } });
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
const Genre = mongoose_1.default.model('Genre', genreSchema);
exports.default = Genre;
