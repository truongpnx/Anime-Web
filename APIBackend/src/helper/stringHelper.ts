import mongoose from 'mongoose';

function normalizeAnimeName(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}

export { normalizeAnimeName };
