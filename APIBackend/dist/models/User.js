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
const Comment_1 = __importDefault(require("./Comment"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});
userSchema.pre('deleteOne', { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Comment_1.default.deleteMany({ userId: this._id });
            console.log(`All comments for user ${this._id} have been deleted.`);
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
userSchema.pre(['deleteOne', 'findOneAndDelete'], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedUserId = yield User.findOne(this.getQuery()).select('_id');
            yield Comment_1.default.deleteMany({ userId: deletedUserId });
            console.log(`All comments for user ${deletedUserId} have been deleted.`);
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
userSchema.pre('deleteMany', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIds = yield User.find(this.getQuery()).select('_id');
            yield Comment_1.default.deleteMany({ userId: { $in: userIds } });
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
const User = mongoose_1.default.model('User', userSchema);
module.exports = User;
