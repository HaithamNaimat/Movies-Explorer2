import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
import { logPostRequest } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. إعدادات الـ CORS والـ Middleware الأساسية
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(logPostRequest);

// 2. كود الاتصال بقاعدة البيانات (تم تقديمه هنا ليتمكن الـ MongoStore من القراءة منه فوراً)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // تشغيل السيرفر بعد نجاح الاتصال بالقاعدة
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// 3. إعداد الجلسات (Sessions) باستخدام MongoStore بعد بدء اتصال الـ Mongoose
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: false, // ممتار إنها false عشان تشتغل على الرندر بدون تعقيدات الـ HTTPS
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// 4. مسارات الـ API (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// فحص حالة السيرفر
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
