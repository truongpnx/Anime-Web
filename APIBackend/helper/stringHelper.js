/**
 * Normalize anime to skip connection case.
 * @param {string} name - The name of the anime.
 */

function normalizeAnimeName(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}

module.exports = { normalizeAnimeName };
