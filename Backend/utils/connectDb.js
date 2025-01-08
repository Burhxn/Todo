const mongoose = require("mongoose");
const { config } = require("dotenv");

config({ path: "./.env" });

const url = process.env.DB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(url); 
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); 
  }
};

module.exports = connectDb;
