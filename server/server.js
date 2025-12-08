import dotenv from 'dotenv';
dotenv.config();                    // MUST be first thing

console.log("DEBUG SERVER ENV PRIVATE KEY =", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("DEBUG SERVER ENV PUBLIC KEY =", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("DEBUG SERVER ENV URL =", process.env.IMAGEKIT_URL_ENDPOINT);

import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';

import userRouter from './Routes/userRoutes.js';
import ownerRouter from './Routes/ownerRoutes.js';
import imagekit from "./configs/imagekit.js";

console.log("RAW MONGO_URI =", process.env.MONGO_URI);


// Initialize express app
const app = express();

// Connect database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);





