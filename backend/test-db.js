const mongoose = require("mongoose");

async function testConnection() {
  try {
    await mongoose.connect("mongodb+srv://staymate_user:StayMate2025@staymatecluster.sefzrb7.mongodb.net/staymate?retryWrites=true&w=majority&appName=staymateCluster", {
      serverSelectionTimeoutMS: 5000,
      tls: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

testConnection();
