"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_1 = __importDefault(require("./Comment"));
const ViewHistory_1 = __importDefault(require("./ViewHistory"));
const stringHelper_1 = require("../helper/stringHelper");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: stringHelper_1.isValidEmail,
            message: (props) => `${props.value} is not a valid email address!`,
        },
        unique: true,
    },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await (0, stringHelper_1.encryptPassword)(this.password);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Comment_1.default.deleteMany({ userId: this._id });
        await ViewHistory_1.default.deleteMany({ userId: this._id });
        next();
    }
    catch (err) {
        next(err);
    }
});
userSchema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
    try {
        const deletedUser = await this.model.findOne(this.getQuery(), '_id');
        await Comment_1.default.deleteMany({ userId: deletedUser._id });
        await ViewHistory_1.default.deleteMany({ userId: deletedUser._id });
        next();
    }
    catch (err) {
        next(err);
    }
});
userSchema.pre('deleteMany', async function (next) {
    try {
        const userIds = await this.model.find(this.getQuery(), '_id');
        await Comment_1.default.deleteMany({ userId: { $in: userIds.map((e) => e._id) } });
        await ViewHistory_1.default.deleteMany({ userId: { $in: userIds.map((e) => e._id) } });
        next();
    }
    catch (err) {
        next(err);
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
