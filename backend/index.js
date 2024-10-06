import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express()

dotenv.config();
const PORT = process.env.PORT || 4002
const DB_URI = process.env.MONGODB_URI

// Database connection
try {
    mongoose.connect(DB_URI)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})