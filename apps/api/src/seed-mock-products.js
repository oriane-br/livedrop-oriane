import mongoose from 'mongoose';
import Product from './models/product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust this if you use a different DB name or user/pass
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoplite';

const mockPath = path.resolve(__dirname, '../../storefront/public/mock-catalog.json');
const products = JSON.parse(fs.readFileSync(mockPath, 'utf8'));

// Map mock shape to backend shape
const mapped = products.map((p) => ({
  _id: p.id, // Use "PROD-XXX" as _id for easy linking
  name: p.title,
  description: "Demo product for testing.",
  price: p.price,
  category: p.tags[0] || "misc",
  tags: p.tags,
  imageUrl: p.image,
  stock: p.stockQty
}));

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(mapped);
    console.log('Seeded mock products!');
    
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

run();