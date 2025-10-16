import { connectDB } from './src/db.js';

async function test() {
  try {
    await connectDB();
    console.log('✅ Connection test successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    process.exit(1);
  }
}

test();