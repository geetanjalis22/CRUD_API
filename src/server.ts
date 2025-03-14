import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";
import tagRoutes from "./routes/tagRoutes";
import articleRoutes from "./routes/articleRoutes";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to the CRUD API!");
});
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
