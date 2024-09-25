import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS options
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "https://jobportal-2ptm.onrender.com", 
    credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files from the frontend
const __dirname = path.resolve(); // Correctly resolving the directory name
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); 
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
