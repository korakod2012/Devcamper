const express = require("express");
const dotenv = require("dotenv");
//const logger = require("./middleware/logger");
const morgan = require("morgan"); //Middleware for logger
const connectDB = require("./config/db");
const colors = require("colors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// Route files
const bootcamps = require("./routes/bootcamp");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.get("/", (req, res) => {
  res.send("hello from express");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .inverse
  )
);

// Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:  ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
