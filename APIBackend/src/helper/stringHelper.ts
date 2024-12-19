import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

function normalizeAnimeName(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
}

async function encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

export { normalizeAnimeName, encryptPassword, isValidEmail };
