import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET, // Make sure SESSION_SECRET is defined in your .env
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !('development' === process.env.NODE_ENV) } // Secure cookies in production
}));

app.use(passport.initialize());
app.use(passport.session()); // Tells Passport to use sessions

// Passport Steam strategy setup
passport.use(new SteamStrategy({
  returnURL: `${process.env.SERVER_URL}/auth/steam/return`,
  realm: process.env.SERVER_URL,
  apiKey: process.env.STEAM_API_KEY
},
function(identifier, profile, done) {
  console.log(profile);
  // This is where you would find or create the user in your database
  // For now, just passing the profile object
  return done(null, profile);
}
));

// Passport session setup
// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Adjust depending on your user object, might be user.steamId
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
    console.log(`Returned from Steam`);
    res.redirect(process.env.APP_DOMAIN); // Redirect user after successful authentication
  }
);

// Home route
app.get('/', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});