import fs from 'node:fs/promises';

export default async function writePosts(content) {
  try {
    await fs.writeFile('../db/posts.json', JSON.stringify(content, null, 2), "utf8");
  } catch (error) {
    console.error('Error writing posts:', error);
    throw new Error('Error writing posts:', error)
  }
}
