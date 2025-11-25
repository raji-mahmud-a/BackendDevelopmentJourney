import fs from 'node:fs/promises';

export default async function getComments() {
    try {
        const comments = await fs.readFile('../db/comments.json', "utf8");
        return JSON.parse(comments);
    } catch (error) {
        console.error('Error reading comments:', error);
        throw new Error('Error reading comments:', error)
    }
}
