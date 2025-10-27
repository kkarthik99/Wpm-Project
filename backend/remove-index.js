const mongoose = require('mongoose');
require('dotenv').config();

async function removeProblematicIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Drop the username_1 index
    await mongoose.connection.collection('users').dropIndex('username_1');
    console.log('✅ Successfully removed username_1 index');
    
    // Verify indexes are clean
    const indexes = await mongoose.connection.collection('users').indexes();
    console.log('📊 Updated indexes:');
    
    indexes.forEach((index, i) => {
      console.log(`${i + 1}. ${index.name}:`, index.key);
    });
    
    await mongoose.connection.close();
    console.log('🎉 Index fix completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('index not found')) {
      console.log('ℹ️  Index was already removed or never existed');
    }
  }
}

removeProblematicIndex();