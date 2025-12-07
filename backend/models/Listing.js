// backend/models/Listing.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  type: { type: String, enum: ['need-roommate','wants-roommate','rentals'], required: true },
  fullName: String,
  email: String,
  age: String,
  gender: String,
  phone: String,
  location: String,
  // Add all fields you need from the form
  preferences: [String], 
  aboutMe: String,
  rentAmount: String,
  propertyAddress: String,
  createdAt: { type: Date, default: Date.now },
  // If you store images as URLs
  profileImageUrl: String,
  propertyImageUrls: [String]
});

module.exports = mongoose.model('Listing', listingSchema);
