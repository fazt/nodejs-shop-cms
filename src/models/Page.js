const mongoose = require('mongoose');
const { Schema } = mongoose;

const PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sorting: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Page', PageSchema);
