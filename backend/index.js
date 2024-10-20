import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import todoRoute from "../backend/routes/todo.route.js"
import userRoute from "../backend/routes/user.route.js"

const app = express()

dotenv.config();
const PORT = process.env.PORT || 4002
const DB_URI = process.env.MONGODB_URI

// Database connection
try {
   await mongoose.connect(DB_URI)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error);
}

// Routes
app.use(express.json())
app.use("/todo",todoRoute)
app.use("/user",userRoute)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})