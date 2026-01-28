import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_PATH = path.join(__dirname, '../src/data/products.json');

try {
  const rawData = fs.readFileSync(PRODUCTS_PATH, 'utf8');
  const products = JSON.parse(rawData);
  
  const target = products.find(p => p.name.includes('Leichtes Jacke'));
  
  if (target) {
    console.log('Found product:', JSON.stringify(target, null, 2));
  } else {
    console.log('Product not found');
  }
} catch (error) {
  console.error('Error:', error);
}
