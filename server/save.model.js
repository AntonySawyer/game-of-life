const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
  name: String,
  field: String,
});

module.exports = mongoose.model('game', saveSchema);