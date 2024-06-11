import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const { CLIENT_URL } = process.env;

// Initial route to start the authentication process
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

// Callback route that Google redirects to after authentication
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('/login');
    }

    // Create JWT token
    const token = jwt.sign({ userId: req.user.googleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token as HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    // Create a user profile object
    const userProfile = {
      googleId: req.user.googleId,
      displayName: req.user.name,
      email: req.user.email,
      picture: req.user.picture,
    };

    // Redirect to client with user profile in URL
    // res.redirect(`${CLIENT_URL}/?profile=${encodeURIComponent(JSON.stringify(userProfile))}`);
    res.redirect(`${CLIENT_URL}/messenger?profile=${encodeURIComponent(JSON.stringify(userProfile))}`);

  }
);

export default router;

//Server:::
// Create the JWT token and set it as an HTTP-only cookie.
// Create a user profile object before redirection.
// Redirect to the frontend with the user profile in the URL query parameters.










//================================================================================================21/05/24
// code before redirects and params search:

// import express from 'express';
// import passport from 'passport';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// //using paaport-jwt is for using with jwt with passport insted of sessions:i need to use it.
// const router = express.Router();

// // Initial route to start the authentication process
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Callback route that Google redirects to after authentication
// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login', session: false }),
//   (req, res) => {
//     console.log('Before setting cookie:', req.cookies); // Log cookies before setting new one
//     const token = jwt.sign({ userId: req.user.googleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     console.log('After setting cookie:', req.cookies); // Log cookies after setting new one
//     console.log('Set-Cookie header:', res.get('Set-Cookie')); // Log Set-Cookie header
//     console.log('Redirecting to Messenger component...');
//     res.redirect('http://localhost:5173/messenger?login=true');
//     // creacte a user object: i need to create it before, and i dont need token here because of token i in cookies.res.cookie('token', token, { httpOnly: true });
//     res.redirect(`${CLIENT_URL}?token=${token}&profile=${encodeURIComponent(JSON.stringify(user))}`)
//   });

// export default router;
