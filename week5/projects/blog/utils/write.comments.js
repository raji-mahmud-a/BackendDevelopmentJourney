import fs from 'node:fs/promises';

export default async function writeComments(content) {
  try {
    await fs.writeFile('../db/comments.json', JSON.stringify(content, null, 2), "utf8");
  } catch (error) {
    console.error('Error writing comments:', error);
    throw new Error('Error writing comments:', error)
  }
}
