const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespaces
  },
  rentalPrice: {
    type: Number,
    required: true,
    min: 0, // Minimum rentalPrice should be 0
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, // Maximum description length
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Minimum quantity should be 0
  },
  userId: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
