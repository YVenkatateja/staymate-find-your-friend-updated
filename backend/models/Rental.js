// backend/models/Rental.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  name: String,
  email: { type: String, index: true, sparse: true },
  phone: { type: String, index: true, sparse: true },
  location: String,
  rentBudget: String,
  price: String,
  propertyType: String,
  propertyImages: [String],
  amenities: [String],
  profileImage: { type: String, default: '/placeholder.svg' },
  isOwn: { type: Boolean, default: false },
  preferences: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Rental', schema, 'rentals');
