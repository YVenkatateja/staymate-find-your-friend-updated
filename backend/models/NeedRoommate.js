// models/NeedRoommate.js
const mongoose = require('mongoose');

const NeedRoommateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true,unique: true, sparse: true, index: true },
  phone: { type: String, trim: true, unique: true, sparse: true, index: true },

  // basic profile fields
  age: { type: Number },
  gender: { type: String },
  location: { type: String },
  rentBudget: { type: String },
  propertyType: { type: String },
  roomDescription: { type: String },
  roommatePreference: { type: String },
  availableFrom: { type: Date },
  furnishingStatus: { type: String },
  depositAmount: { type: String },

  // arrays
  propertyImages: { type: [String], default: [] }, // array of URLs
  preferences: { type: [String], default: [] },
  amenities: { type: [String], default: [] },

  // profile image (single)
  profileImage: { type: String, default: '/placeholder.svg' },

  // whether poster is owner of the place (useful filter)
  isOwn: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Ensure uniqueness constraints in DB
// NOTE: creating unique indexes on fields that might be null can be tricky.
// We'll create a compound sparse index so only non-null values are enforced.
NeedRoommateSchema.index({ email: 1 }, { unique: true, sparse: true });
NeedRoommateSchema.index({ phone: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('NeedRoommate', NeedRoommateSchema);
