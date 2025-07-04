import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.routes';
import './controllers/report.controller';
import { verifyToken } from './middlewares/auth.middleware';
import reportRoutes from './routes/report.routes';
import parcelRoutes from './routes/parcel.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  },
});
// Example for allowing localhost:5173 in development and all in production
const allowedOrigins = [
  'http://localhost:5173',
  "https://courier-system-backend.vercel.app"
];


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/parcel', verifyToken, parcelRoutes);
app.use('/api/user', verifyToken, userRoutes);
app.use('/api/reports', verifyToken, reportRoutes);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

app.set('io', io);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB Atlas connected");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));

