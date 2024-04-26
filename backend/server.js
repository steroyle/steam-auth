import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/database.js';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import indexRoutes from './routes/indexRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI);

app.use(cors({
  origin: process.env.APP_DOMAIN,
  credentials: true,
}));

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGODB_URI,
  collection: 'sessions',
});

app.use(session({
  secret: process.env.SESSION_SECRET, // Make sure SESSION_SECRET is defined in your .env
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: !('development' === process.env.NODE_ENV), // Secure cookies in production
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

configurePassport(process.env);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/games', gamesRoutes);
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});