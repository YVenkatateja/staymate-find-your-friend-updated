// backend/models/WantsRoommate.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: String,
  email: { type: String, index: true, sparse: true },
  phone: { type: String, index: true, sparse: true },
  age: Number,
  gender: String,
  location: String,
  roomDescription: String,
  rentBudget: String,
  propertyType: String,
  roommatePreference: String,
  preferences: [String],
  propertyImages: [String],
  amenities: [String],
  profileImage: { type: String, default: '/placeholder.svg' },
  isOwn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('WantsRoommate', schema, 'wantsroommates');
