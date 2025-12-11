import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path"

import notesRoutes from './routes/notesRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { connectDB } from "./config/db.js";

dotenv.config(); // Load variables from .env

const app = express(); // Create an Express app to define routes and middleware
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse incoming JSON requests, it populates req.body with the parsed JSON (objects)

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "*", //For now will change later
        credentials: true
    }));   
}

const PORT = process.env.PORT || 5001; 

// Auth routes for login
app.use("/auth", authRoutes);

// Notes routes (protected json tokens)
app.use("/api/notes", authMiddleware, notesRoutes);

if(process.env.NODE_ENV === "production"){
    //Serve the react
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    //SPA fallback (send React index.html)
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });  


}
// Start server only after DB connects
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on port", PORT);
    });
})