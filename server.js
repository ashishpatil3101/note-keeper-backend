import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

dotenv.config();
const app = express();
global.revokedTokens = new Set();

// Middleware
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

//global error handler middleware
app.use((err, req, res, next) => {
	const errStatus = err.status || 500;
	const errMessage = err.message || "Something went wrong!!!";
	return res.status(err.status || 500).json({
		success: false,
		message: errMessage,
		data:[]
	});
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected');
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => console.error(err.message));
