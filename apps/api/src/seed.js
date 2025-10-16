import { connectDB } from './db.js';
import Customer from './models/customer.js';
import Product from './models/product.js';
import Order from './models/order.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



// Load environment variables
dotenv.config();


// Since we are using ES modules, we need to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON files from your existing data folder
const productsPath = path.join(__dirname, '../data/products.json');
const customersPath = path.join(__dirname, '../data/customers.json');
const ordersPath = path.join(__dirname, '../data/orders.json');

// Load the data from your existing JSON files
const seedData = {
  products: JSON.parse(fs.readFileSync(productsPath, 'utf8')),
  customers: JSON.parse(fs.readFileSync(customersPath, 'utf8')),
  orders: JSON.parse(fs.readFileSync(ordersPath, 'utf8'))
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Existing data cleared');
    
    // Insert products
    console.log(`📦 Inserting ${seedData.products.length} products...`);
    const products = await Product.insertMany(seedData.products);
    console.log(`✅ ${products.length} products inserted`);
    
    // Insert customers
    console.log(`👥 Inserting ${seedData.customers.length} customers...`);
    const customers = await Customer.insertMany(seedData.customers);
    console.log(`✅ ${customers.length} customers inserted`);
    
    // Insert orders (need to handle product references)
    console.log(`📦 Inserting ${seedData.orders.length} orders...`);
    
    const ordersWithProductIds = [];
    
    for (const order of seedData.orders) {
      const orderItems = [];
      
      for (const item of order.items) {
        const product = await Product.findOne({ name: item.productName });
        if (!product) {
          console.log(`⚠️  Product not found: ${item.productName}`);
          continue;
        }
        orderItems.push({
          productId: product._id,
          name: item.productName,
          price: product.price,
          quantity: item.quantity
        });
      }
      
      const customer = await Customer.findOne({ email: order.customerEmail });
      if (!customer) {
        console.log(`⚠️  Customer not found: ${order.customerEmail}`);
        continue;
      }
      
      const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create random dates within last 30 days
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - randomDaysAgo);
      
      ordersWithProductIds.push({
        customerId: customer._id,
        items: orderItems,
        total: total,
        status: order.status,
        createdAt: orderDate,
        updatedAt: orderDate
      });
    }
    
    const orders = await Order.insertMany(ordersWithProductIds);
    console.log(`✅ ${orders.length} orders inserted`);
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
