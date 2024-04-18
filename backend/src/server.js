import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { User } from './mongoose/schemas/user.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const mongoString = process.env.MONGODB_URI;

// Connect to database
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.use(cors({
  origin: process.env.APP_DOMAIN, // Adjust this to match your frontend origin
  credentials: true,
}));

const sessionStore = new MongoStore({
  mongoUrl: mongoString,
  collection: 'sessions',
});

// Session setup
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

app.use(passport.initialize());
app.use(passport.session()); // Tells Passport to use sessions

// Passport Steam strategy setup
passport.use(new SteamStrategy({
  returnURL: `${process.env.SERVER_URL}/auth/steam/return`,
  realm: process.env.SERVER_URL,
  apiKey: process.env.STEAM_API_KEY
},
  async (identifier, profile, done) => {
    console.log(profile);
  try {
    let user = await User.findOne({ steamId: profile.id });

    if (user) {
      // User exists, update displayName and return the existing user
      user.displayName = profile.displayName;
      await user.save();
      done(null, user); // Existing user updated and returned
    } else {
      // No user found, create a new user
      user = new User({
        steamId: profile.id,
        displayName: profile.displayName,
        photo: profile.photos[1].value,
      });
      await user.save();
      done(null, user); // New user created and returned
    }
  } catch (err) {
    done(err);
  }
}));

// Passport session setup
// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user); // Adjust depending on your user object, might be user.steamId
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  // Here you would use the ID to retrieve the user from your database
  // Since we're just logging the profile for now, this is simplified
  done(null, { id }); // This should match your actual user retrieval logic
});

// Authentication route
app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

// Callback route after Steam authentication
app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    // console.log(`Returned from Steam`);
    res.redirect(process.env.APP_DOMAIN); // Redirect user after successful authentication
  }
);

app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    // Assuming the user object is stored in req.user after successful authentication
    const userData = {
      id: req.user.id, // Include only non-sensitive information
      displayName: req.user.displayName,
      // Add other user details as needed
    };
    res.json({
      isAuthenticated: true,
      user: userData,
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});


// Home route
app.get('/', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});