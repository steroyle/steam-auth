import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }));

router.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.redirect(process.env.APP_DOMAIN);
});

router.get('/status', (req, res) => {
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

export default router;