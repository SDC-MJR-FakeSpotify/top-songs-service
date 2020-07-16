const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/spotify', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('MongoDB is running...');
});

module.exports = db