import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import notesRoutes from './routes/notesRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { connectDB } from "./config/db.js";

dotenv.config(); // Load variables from .env

const app = express(); // Create an Express app to define routes and middleware

app.use(express.json()); // Middleware to parse incoming JSON requests, it populates req.body with the parsed JSON (objects)

app.use(cors({
    origin: "*", //For now will change later
    credentials: true
}));

const PORT = process.env.PORT || 5001; 

// Auth routes for login
app.use("/auth", authRoutes);

// Notes routes (protected json tokens)
app.use("/api/notes", authMiddleware, notesRoutes);

// Start server only after DB connects
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on port", PORT);
    });
})