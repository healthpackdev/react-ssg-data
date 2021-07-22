import fs from 'fs';
import path from 'path';

// if parent dir doesn't exist, create it and write a file
export const writeFile = (filePath: string, content: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(filePath, content);
};
