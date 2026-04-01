import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path"

import notesRoutes from './routes/notesRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { globalApiLimiter } from "./middleware/rateLimiter.js";
import { connectDB } from "./config/db.js";

dotenv.config(); // Load variables from .env

const app = express(); // Create an Express app to define routes and middleware
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Render sits behind a proxy, so trust the first proxy hop for req.ip.
    app.set("trust proxy", 1);
}

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "*", //For now will change later
        credentials: true
    }));   
}

const PORT = process.env.PORT || 5001; 

app.use((err, req, res, next) => {
    if (err?.type === "entity.too.large") {
        return res.status(413).json({ message: "Request body is too large" });
    }

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON payload" });
    }

    next(err);
});

// Auth routes for login
//We use router 
//The app.use("/auth", authRoutes) tells Express: “for any request starting with /auth, delegate handling to this router”.
app.use("/auth", globalApiLimiter, authRoutes);

// Notes routes (protected json tokens)
app.use("/api/notes", globalApiLimiter, authMiddleware, notesRoutes);

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
