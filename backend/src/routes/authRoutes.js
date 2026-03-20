import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/authController.js";
import rateLimiter from "../middleware/rateLimiter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//How router works
//The app.use("/auth", authRoutes) tells Express: “for any request starting with /auth, delegate handling to this router”.

// Protected route: get logged-in user
router.get("/me", authMiddleware, getCurrentUser);

// Register
router.post("/register", registerUser);

// Login (rate-limited)
router.post("/login", rateLimiter, loginUser);

export default router;
