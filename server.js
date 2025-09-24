const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const offerRoutes = require("./routes/offerRoutes");
const timeRoutes = require("./routes/timeRoutes")
const templateRoutes = require("./routes/templateRoutes")

require("dotenv").config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());


app.use("/api/offers", offerRoutes);
app.use("/api/time", timeRoutes);
app.use("/api/template", templateRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/offers, /api/template, or /api/time");
});


sequelize.sync({ alter: true }).then(() => {
  console.log(" Database synced");
  app.listen(process.env.PORT || 5000, () =>
    console.log(` Server running on port ${process.env.PORT || 5000}`)
  );
}).catch(err => console.error(" DB connection failed:", err));
