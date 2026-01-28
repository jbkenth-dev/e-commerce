import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORIES = ['Herren', 'Damen', 'Kinder', 'Accessoires'];

const ADJECTIVES = ['Modernes', 'Klassisches', 'Elegantes', 'Bequemes', 'Sportliches', 'Lässiges', 'Exklusives', 'Premium', 'Basic', 'Vintage', 'Buntes', 'Leichtes', 'Warmes'];
const NOUNS = ['T-Shirt', 'Hemd', 'Poloshirt', 'Sweatshirt', 'Hoodie', 'Top', 'Tanktop'];
const BOTTOMS = ['Hose', 'Jeans', 'Shorts', 'Jogginghose', 'Chino'];
const OUTERWEAR = ['Jacke', 'Mantel', 'Weste', 'Blazer'];
const ACCESSORIES = ['Mütze', 'Schal', 'Gürtel', 'Tasche', 'Rucksack', 'Sonnenbrille', 'Uhr'];

const COLORS = ['Schwarz', 'Weiß', 'Blau', 'Rot', 'Grün', 'Gelb', 'Grau', 'Beige', 'Braun', 'Navy', 'Oliv', 'Pink'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProducts(count) {
  const products = [];
  
  for (let i = 1; i <= count; i++) {
    const category = getRandomItem(CATEGORIES);
    let name = '';
    let price = 0;
    
    if (category === 'Accessoires') {
      name = `${getRandomItem(ADJECTIVES)} ${getRandomItem(ACCESSORIES)}`;
      price = Math.floor(Math.random() * 80) + 10;
    } else {
      const type = Math.random() > 0.6 ? getRandomItem(OUTERWEAR) : (Math.random() > 0.5 ? getRandomItem(BOTTOMS) : getRandomItem(NOUNS));
      name = `${getRandomItem(ADJECTIVES)} ${type}`;
      price = Math.floor(Math.random() * 150) + 20;
    }

    // Add color to name sometimes
    if (Math.random() > 0.7) {
      name += ` in ${getRandomItem(COLORS)}`;
    }

    products.push({
      id: i,
      name: name,
      category: category,
      price: price,
      image: `https://picsum.photos/seed/${i + 500}/400/500`, // Offset seed to avoid generic nature images
      description: `Dieses hochwertige ${name} ist perfekt für den Alltag. Beste Qualität und angenehmer Tragekomfort. Verfügbar in verschiedenen Größen.`,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      reviews: Math.floor(Math.random() * 100)
    });
  }
  
  return products;
}

const products = generateProducts(1000);
const outputPath = path.join(__dirname, '../src/data/products.json');

fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products to ${outputPath}`);
