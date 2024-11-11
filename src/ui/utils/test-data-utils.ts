import fs from 'fs';
import path from 'path';

export function loadTestData(fileName: string): any {
  const filePath = path.resolve(__dirname, `../utils/${fileName}`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`FilepPath not found: ${filePath}`);
  }

  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}
