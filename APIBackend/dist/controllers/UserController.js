"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const stringHelper_1 = require("../helper/stringHelper");
const User_1 = __importDefault(require("../models/User"));
const getUser = async (req, res) => {
    res.send('Need to get token');
};
exports.getUser = getUser;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(0, stringHelper_1.isValidEmail)(email)) {
            return res.status(401).json({ error: 'Unauthorization' });
        }
        const user = await User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorization' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Unauthorization' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error in user login', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.login = login;
const signUp = async (req, res) => {
    try {
        if (!(0, stringHelper_1.isValidEmail)(req.body.email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }
        const user = new User_1.default(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    }
    catch (error) {
        console.error('Error in user signUp', error);
        res.status(400).json({ error: error.message });
    }
};
exports.signUp = signUp;
