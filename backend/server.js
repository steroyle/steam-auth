import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Set up your Steam strategy here
// You need to replace 'YOUR_STEAM_API_KEY' and 'YOUR_RETURN_URL'
passport.use(new SteamStrategy({
  returnURL: `${process.env.SERVER_URL}/auth/steam/return`,
  realm: process.env.SERVER_URL,
  apiKey: process.env.STEAM_API_KEY
},
function(identifier, profile, done) {
  console.log(profile);
  return done(null, profile);
  // User.findOrCreate({ steamId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
}
));

// Route to start the authentication process
app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

// Route for Steam to redirect back to after logging in
app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(`Returned from Steam`);
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);


app.get('/', (req, res) => {
  res.send({ message: 'Hello from the backend!'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});