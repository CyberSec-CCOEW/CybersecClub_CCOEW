require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Firebase Admin setup (STEP 3.3)
const admin = require("firebase-admin");
const serviceAccount = require("../keys/firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// Firebase connected

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CybersecClub CCOEW Backend Running");
});

// Test Firebase connection
app.get("/api/test-db", async (req, res) => {
  try {
    const ref = db.collection("test").doc("hello");
    await ref.set({
      message: "Firebase connected successfully",
      time: new Date()
    });

    const snap = await ref.get();
    res.json(snap.data());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Firebase connection failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
