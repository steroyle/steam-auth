import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { User } from '../models/user.js'; // Assuming your User model is here

export const configurePassport = (env) => {
  passport.use(new SteamStrategy({
    returnURL: `${env.SERVER_URL}/auth/steam/return`,
    realm: env.SERVER_URL,
    apiKey: env.STEAM_API_KEY
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

  passport.serializeUser((user, done) => {
    done(null, user.id); // Adjust as needed
  });

  passport.deserializeUser((id, done) => {
    // Your deserialization logic here
    done(null, { id }); // Simplified example
  });
};
