const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const path = require("path");

const User = require("./models/User");

const NeedRoommate = require("./models/NeedRoommate");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
console.log(">> STARTING server from:", __dirname);
// --- REQUEST LOGGER (paste right after: const app = express(); ) ---
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment");
} else {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      // do NOT exit here in case you want server to still respond to health checks
    });
}
app.get("/_health", (req, res) => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return res.status(200).json({ status: "ok", mongo: "connected" });
  }
  return res.status(200).json({ status: "ok", mongo: "not-connected" });
});

// -------- JWT Helper --------
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// --------- Manual Signup ---------
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    const token = generateToken(newUser);

    res.json({ message: "User created", token, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------- Manual Login ---------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user);

    res.json({ message: "Logged in", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------- Google Login ---------
app.post("/auth/google", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({ email: payload.email, name: payload.name });
      await user.save();
    }

    const jwtToken = generateToken(user);

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid Google token" });
  }
});

// --------- Middleware for JWT Verification ---------
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// --------- Protected Route Example ---------
app.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// at top of server.js
const multer = require('multer');
const fs = require('fs');

// ensure uploads dir exists
const UPLOAD_DIR = path.join(__dirname, 'uploads'); // serves from frontend build; adjust as needed
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// upload route
app.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // Build a URL relative to your frontend static server. If serving from same server:
    const publicUrl = `/uploads/${req.file.filename}`;
    return res.json({ url: publicUrl });
  } catch (err) {
    console.error('UPLOAD ERR', err);
    return res.status(500).json({ error: err.message });
  }
});

// Serve the uploads folder as static too (so returned URL is reachable)
app.use('/uploads', express.static( path.join(UPLOAD_DIR) ));


// POST /needroommates — robust duplicate check + 409 on duplicate
// GET /needroommates - list with pagination, search, basic filters
// POST /needroommates — robust duplicate check + 409 on duplicate
// ======= ADD THIS: GET /needroommates (place BEFORE express.static & catch-all) =======
// ----------------- SHARED CREATE + LIST HANDLERS (paste BEFORE Serve frontend) -----------------

// Reusable create/list logic — uses NeedRoommate model (keeps single collection, no duplicates)
// === Add these create/list handlers (paste BEFORE static/catch-all) ===

// shared create handler
const handleCreateListing = async (req, res) => {
  try {
    const payload = req.body || {};
    const name = (payload.name || payload.fullName || "").trim();
    const email = payload.email ? String(payload.email).trim().toLowerCase() : null;
    const phone = payload.phone ? String(payload.phone).trim() : null;

    if (!name) return res.status(400).json({ error: "name is required" });
    if (!email && !phone) return res.status(400).json({ error: "email or phone is required" });

    const dupQuery = { $or: [] };
    if (email) dupQuery.$or.push({ email });
    if (phone) dupQuery.$or.push({ phone });

    let existing = null;
    if (dupQuery.$or.length > 0) existing = await NeedRoommate.findOne(dupQuery).lean();
    if (existing) return res.status(409).json({ error: "Listing already exists", item: existing });

    const docPayload = {
      name,
      email: email || undefined,
      phone: phone || undefined,
      age: payload.age ? Number(payload.age) : undefined,
      gender: payload.gender || undefined,
      location: payload.location || payload.city || undefined,
      roomDescription: payload.roomDescription || payload.about || payload.aboutMe || undefined,
      rentBudget: payload.rentBudget || undefined,
      propertyType: payload.propertyType || undefined,
      roommatePreference: payload.roommatePreference || undefined,
      preferences: Array.isArray(payload.preferences) ? payload.preferences : (payload.preferences ? String(payload.preferences).split(',').map(s=>s.trim()).filter(Boolean) : []),
      propertyImages: Array.isArray(payload.propertyImages) ? payload.propertyImages : [],
      amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
      isOwn: !!payload.isOwn,
      createdAt: new Date()
    };

    const doc = new NeedRoommate(docPayload);
    await doc.save();
    console.log("POST created listing id=", doc._id);
    return res.status(201).json({ message: "Saved", item: doc });
  } catch (err) {
    if (err && err.code === 11000) {
      console.error("duplicate index on create:", err.keyValue);
      const item = await NeedRoommate.findOne({ $or: [ { email: err.keyValue?.email }, { phone: err.keyValue?.phone } ] }).lean();
      return res.status(409).json({ error: "Listing already exists", item });
    }
    console.error("create listing error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};

// canonical + alias POST endpoints used by frontend
// Use the generic createHandlerFor and bind proper models per endpoint



// GET list endpoint (canonical)
app.get("/needroommates", async (req, res) => {
  console.log("DEBUG GET /needroommates", req.query);
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const { q, location, preferences, amenities, propertyType, gender, isOwn, sort = "-createdAt" } = req.query;
    const filter = {};

    if (q) {
      const r = new RegExp(String(q), "i");
      filter.$or = [{ name: r }, { location: r }, { roomDescription: r }, { email: r }];
    }
    if (location) filter.location = { $regex: new RegExp(String(location), "i") };
    if (propertyType) filter.propertyType = String(propertyType);
    if (gender) filter.gender = String(gender);
    if (typeof isOwn !== "undefined") filter.isOwn = String(isOwn) === "true";
    if (preferences) {
      const prefs = String(preferences).split(",").map(s => s.trim()).filter(Boolean);
      if (prefs.length) filter.preferences = { $in: prefs };
    }
    if (amenities) {
      const am = String(amenities).split(",").map(s => s.trim()).filter(Boolean);
      if (am.length) filter.amenities = { $in: am };
    }

    const [items, total] = await Promise.all([
      NeedRoommate.find(filter).sort(sort).skip(skip).limit(limit).select("-__v"),
      NeedRoommate.countDocuments(filter)
    ]);

    return res.json({ items, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /needroommates error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});
// Update an existing listing
// REPLACE the old GET /needroommates handler with this merged-version
app.get("/needroommates", async (req, res) => {
  console.log("DEBUG GET /needroommates (merged from NeedRoommate + WantsRoommate)", req.query);
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const { q, location, preferences, amenities, propertyType, gender, isOwn, sort = "-createdAt" } = req.query;

    // Build same filter for both collections
    const buildFilter = () => {
      const filter = {};
      if (q) {
        const r = new RegExp(String(q), "i");
        filter.$or = [{ name: r }, { location: r }, { roomDescription: r }, { email: r }];
      }
      if (location) filter.location = { $regex: new RegExp(String(location), "i") };
      if (propertyType) filter.propertyType = String(propertyType);
      if (gender) filter.gender = String(gender);
      if (typeof isOwn !== "undefined") filter.isOwn = String(isOwn) === "true";
      if (preferences) {
        const prefs = String(preferences).split(",").map(s => s.trim()).filter(Boolean);
        if (prefs.length) filter.preferences = { $in: prefs };
      }
      if (amenities) {
        const am = String(amenities).split(",").map(s => s.trim()).filter(Boolean);
        if (am.length) filter.amenities = { $in: am };
      }
      return filter;
    };

    const filter = buildFilter();

    // If WantsModel or RentalModel fell back to NeedRoommate earlier, they'll be defined accordingly.
    // Query both NeedRoommate and WantsModel (if present). If WantsModel is same as NeedRoommate, we avoid double-query.
    const queryPromises = [];
    queryPromises.push(NeedRoommate.find(filter).select("-__v").lean());
    if (typeof WantsModel !== "undefined" && WantsModel && WantsModel.modelName !== NeedRoommate.modelName) {
      queryPromises.push(WantsModel.find(filter).select("-__v").lean());
    } else {
      // If WantsModel is the same as NeedRoommate (fallback), don't double fetch it
      queryPromises.push(Promise.resolve([]));
    }

    const [needItems, wantsItems] = await Promise.all(queryPromises);

    // Merge, annotate source if helpful, and sort
    const merged = (needItems || []).concat(wantsItems || []).map(item => {
      if (!item.profileImage) item.profileImage = "/placeholder.svg";
      // annotate type if you want to debug in frontend later:
      if (!item._source) item._source = item.__t || "needroommate"; // __t sometimes used by discriminators
      return item;
    });

    // sort by createdAt (descending) unless sort param overrides
    const sortDesc = (a, b) => {
      const ta = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const tb = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return tb - ta;
    };
    merged.sort(sortDesc);

    const total = merged.length;
    const items = merged.slice(skip, skip + limit);

    return res.json({ items, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /needroommates (merged) error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});



// GET aliases used by frontend UI pages — redirect to canonical endpoint (keeps frontend unchanged)
app.get("/view-need-roommate", (req, res) => {
  return res.redirect(302, `/needroommates${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`);
});
app.get("/view-wants-roommate", (req, res) => {
  return res.redirect(302, `/wantsroommates${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`);
});
app.get("/view-rentals", (req, res) => {
  return res.redirect(302, `/rentals${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`);
});


// -------------------- Add these (paste BEFORE static/catch-all) --------------------

// Generic list handler factory (works for needroommates, wantsroommates, rentals)
// ------------------ Add this BEFORE app.use(express.static(...)) ------------------

// helper factories (re-usable)
function makeListHandler(Model, name) {
  return async (req, res) => {
    console.log(`DEBUG: GET /${name}`, req.query);
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, parseInt(req.query.limit) || 20);
      const skip = (page - 1) * limit;
      const { q, location, preferences, amenities, propertyType, gender, isOwn, sort = "-createdAt" } = req.query;

      const filter = {};
      if (q) {
        const r = new RegExp(String(q), "i");
        filter.$or = [{ name: r }, { location: r }, { roomDescription: r }, { email: r }];
      }
      if (location) filter.location = { $regex: new RegExp(String(location), "i") };
      if (propertyType) filter.propertyType = String(propertyType);
      if (gender) filter.gender = String(gender);
      if (typeof isOwn !== "undefined") filter.isOwn = String(isOwn) === "true";
      if (preferences) {
        const prefs = String(preferences).split(",").map(s => s.trim()).filter(Boolean);
        if (prefs.length) filter.preferences = { $in: prefs };
      }
      if (amenities) {
        const am = String(amenities).split(",").map(s => s.trim()).filter(Boolean);
        if (am.length) filter.amenities = { $in: am };
      }

      const [items, total] = await Promise.all([
        Model.find(filter).sort(sort).skip(skip).limit(limit).select("-__v"),
        Model.countDocuments(filter)
      ]);

      return res.json({ items, total, page, limit, totalPages: Math.ceil(total / limit) });
    } catch (err) {
      console.error(`GET /${name} error:`, err);
      return res.status(500).json({ error: err.message || String(err) });
    }
  };
}

function makeGetOneHandler(Model, name) {
  return async (req, res) => {
    console.log(`DEBUG: GET /${name}/:id`, req.params.id);
    try {
      const doc = await Model.findById(req.params.id).select("-__v");
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.json({ item: doc });
    } catch (err) {
      console.error(`GET /${name}/:id error:`, err);
      return res.status(500).json({ error: err.message || String(err) });
    }
  };
}

// attach handlers for needroommates (already handled earlier, fine)
app.get("/needroommates", makeListHandler(NeedRoommate, "needroommates"));
app.get("/needroommates/:id", makeGetOneHandler(NeedRoommate, "needroommates"));

// Try to require wants & rentals models; if they don't exist, fallback to NeedRoommate (so frontend won't 404)
// Try to require wants & rentals models; if they don't exist, fallback to NeedRoommate (so frontend won't 404)
let WantsModel = null;
let RentalModel = null;

try {
  WantsModel = require("./models/WantsRoommate");
  console.log("Loaded WantsRoommate model");
} catch (e) {
  console.warn("WantsRoommate model not found; falling back to NeedRoommate for /wantsroommates. Create models/WantsRoommate.js to separate data.");
  WantsModel = NeedRoommate;
}

try {
  RentalModel = require("./models/Rental");
  console.log("Loaded Rental model");
} catch (e) {
  console.warn("Rental model not found; falling back to NeedRoommate for /rentals. Create models/Rental.js to separate data.");
  RentalModel = NeedRoommate;
}

// Register API routes
app.get("/wantsroommates", makeListHandler(WantsModel, "wantsroommates"));
app.get("/wantsroommates/:id", makeGetOneHandler(WantsModel, "wantsroommates"));

app.get("/rentals", makeListHandler(RentalModel, "rentals"));
app.get("/rentals/:id", makeGetOneHandler(RentalModel, "rentals"));


// require new models at top
const WantsRoommate = require('./models/WantsRoommate');
const Rental = require('./models/Rental');
// (NeedRoommate variable already exists)

// reuse handler factory but pass model explicitly
// shared create handler, but now with model param
const createHandlerFor = (Model) => async (req, res) => {
  try {
    const payload = req.body || {};
    const name = (payload.name || payload.fullName || "").trim();
    const email = payload.email ? String(payload.email).trim().toLowerCase() : null;
    const phone = payload.phone ? String(payload.phone).trim() : null;

    if (!name) return res.status(400).json({ error: "name is required" });
    if (!email && !phone) return res.status(400).json({ error: "email or phone is required" });

    // duplicate check is per-model (so duplicates are local to that collection)
    const dupQuery = { $or: [] };
    if (email) dupQuery.$or.push({ email });
    if (phone) dupQuery.$or.push({ phone });

    const existing = dupQuery.$or.length ? await Model.findOne(dupQuery).lean() : null;
    if (existing) return res.status(409).json({ error: "Listing already exists", item: existing });

    const docPayload = {
      name,
      email,
      phone,
      age: payload.age ? Number(payload.age) : undefined,
      gender: payload.gender,
      location: payload.location || payload.city,
      roomDescription: payload.roomDescription || payload.about || payload.aboutMe,
      rentBudget: payload.rentBudget,
      propertyType: payload.propertyType,
      roommatePreference: payload.roommatePreference,
      preferences: Array.isArray(payload.preferences) ? payload.preferences : (payload.preferences ? String(payload.preferences).split(',').map(s=>s.trim()).filter(Boolean) : []),
      propertyImages: Array.isArray(payload.propertyImages) ? payload.propertyImages : [],
      amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
      profileImage: payload.profileImage || '/placeholder.svg',
      isOwn: !!payload.isOwn,
    };

        // choose model by request path (or fallback)
    // Use req.path which will be like "/wantsroommates" or "/needroommates"
    let ModelToUse = NeedRoommate;
    try {
      const p = (req.path || "").toLowerCase();

      if (p.includes("wants") || p.includes("wantsroommate") || p.includes("wants-to-be-roommate")) {
        ModelToUse = typeof WantsModel !== "undefined" ? WantsModel : NeedRoommate;
      } else if (p.includes("rental") || p.includes("rentals") || p.includes("/rentals")) {
        ModelToUse = typeof RentalModel !== "undefined" ? RentalModel : NeedRoommate;
      } else {
        ModelToUse = NeedRoommate;
      }
    } catch (e) {
      ModelToUse = NeedRoommate;
    }

    const doc = new ModelToUse(docPayload);
    await doc.save();
    console.log("POST created listing id=", doc._id, "model=", ModelToUse.modelName || "NeedRoommate");
    return res.status(201).json({ message: "Saved", item: doc });

  } catch (err) {
    if (err && err.code === 11000) {
      const keyValue = err.keyValue || {};
      const item = await Model.findOne({ $or: [ { email: keyValue.email }, { phone: keyValue.phone } ] }).lean();
      return res.status(409).json({ error: "Listing already exists", item });
    }
    return res.status(500).json({ error: err.message || String(err) });
  }
};

// canonical + alias POST endpoints used by frontend
// Use the generic createHandlerFor and bind proper models per endpoint
app.post("/needroommates", createHandlerFor(NeedRoommate));
app.post("/need-roommate/register", createHandlerFor(NeedRoommate));

app.post("/wants-to-be-roommate/register", createHandlerFor(WantsModel));
app.post("/wantsroommates", createHandlerFor(WantsModel));

app.post("/rentals/register", createHandlerFor(RentalModel));
app.post("/rentals", createHandlerFor(RentalModel));



// -------- Serve frontend ---------
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// -------- Start server ---------
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);