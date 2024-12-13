"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAnimeName = normalizeAnimeName;
exports.encryptPassword = encryptPassword;
exports.isValidEmail = isValidEmail;
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../constants");
function normalizeAnimeName(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}
async function encryptPassword(password) {
    return bcrypt_1.default.hash(password, constants_1.bcryptSaltRounds);
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email) {
    return emailRegex.test(email);
}
