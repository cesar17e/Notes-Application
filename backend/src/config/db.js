import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

// Graceful shutdown helper
const shutdown = async (message, exitCode = 1) => {
    console.log(message);
    try {
        // Close MongoDB connection if it exists
        if (mongoose.connection.readyState) {
            await mongoose.connection.close();
            console.log("MongoDB connection closed");
        }
    } catch (err) {
        console.error("Error during shutdown:", err);
    } finally {
        process.exit(exitCode);
    }
};

// This function connects us to the DB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB CONNECTION SUCCESSFUL');
    } catch (error) {
        console.error("Error connecting to DB:", error);
        await shutdown("Failed to connect to DB. Exiting...", 1);
    }
};
