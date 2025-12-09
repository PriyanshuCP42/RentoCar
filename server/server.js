import dotenv from 'dotenv';
dotenv.config();                    // MUST be first thing
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';

import userRouter from './Routes/userRoutes.js';
import ownerRouter from './Routes/ownerRoutes.js';
import imagekit from "./configs/imagekit.js";
import bookingRouter from './Routes/bookingRoutes.js';


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
app.use('/api/bookings', bookingRouter);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);





