require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorMiddleWare = require("./Middleware/Error");
const { otp } = require("./Model/admin");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;
const dbUrl = process.env.DBURL;

// **DB Connection**
mongoose
  .connect(dbUrl)
  .then(() => {
    otp
      .createIndexes({ createdAt: 1, expireAfterSeconds: 120 })
      .then(() => console.log("✅ OTP indexes ensured"))
      .catch(() => console.log("⚠️ OTP indexes already exist"));

    console.log("✅ Connected to MongoDB successfully!");
  })
  .catch((error) => console.log("❌ Error connecting to MongoDB:", error));

app.use("/", require("./Routes/studentRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));

app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}/`)
);

app.use(errorMiddleWare);