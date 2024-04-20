import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { User } from '../models/user.js';

export const configurePassport = (env) => {
  passport.use(new SteamStrategy(
    {
      returnURL: `${env.SERVER_URL}/auth/steam/return`,
      realm: env.SERVER_URL,
      apiKey: env.STEAM_API_KEY
    },
    async (identifier, profile, done) => {
      // console.log(profile);
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
      }
      catch (err) {
        done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user); // Serialize the entire user object
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user); // Directly pass the user object, since we're not using a database
  });

};
