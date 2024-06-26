import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.Mongo_URI;

console.log("Mongo_URI:", process.env.Mongo_URI);  // Debugging line

if (!URI) {
    console.error("MongoDB URI is not defined in the .env file.");
    process.exit(1);
}

mongoose.connect(URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1); // Exit the process if there's an error connecting to MongoDB
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
