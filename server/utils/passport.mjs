import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/User.mjs'; // Import your User model

import dotenv from 'dotenv';
dotenv.config();

const { PORT, HOST } = process.env; 

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://${HOST}:${PORT}/auth/google/callback`,
  scope: ['openid','profile', 'email'] // Ensure these scopes are valid
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { id, displayName, emails, photos } = profile;
    console.dir(profile);
    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = new User({
        googleId: id,
        name: displayName || 'Anonymous',
        email: emails[0].value,
        picture: photos.length > 0 ? photos[0].value : '', 
        sub: id
      });
      await user.save();
    }

    cb(null, user);
  }
));


export default passport;
