const mongoose = require('mongoose');
require('dotenv').config();

async function checkIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const indexes = await mongoose.connection.collection('users').indexes();
    console.log('📊 Current indexes on users collection:');
    
    indexes.forEach((index, i) => {
      console.log(`${i + 1}. ${index.name}:`, index.key);
    });
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkIndexes();