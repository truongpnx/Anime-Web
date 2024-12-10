"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAnimeName = normalizeAnimeName;
function normalizeAnimeName(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}
