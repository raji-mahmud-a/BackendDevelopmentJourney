import fs from 'node:fs/promises';

export default async function getPosts() {
    try {
        const posts = await fs.readFile('./db/posts.json', "utf8");
        return JSON.parse(posts);
    } catch (error) {
        console.error('Error reading posts:', error);
        throw new Error('Error reading posts:', error)
    }
}
