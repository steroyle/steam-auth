import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }));

router.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.redirect(process.env.APP_DOMAIN);
});

router.get('/steam/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        steamId: req.user.steamId,
        displayName: req.user.displayName,
        avatarUrl: req.user.photo,
      },
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.get('/steam/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    // Destroy the session in express-session
    req.session.destroy(() => {
      // connect.sid is the default name if you don't set one
      res.clearCookie('connect.sid');
      res.redirect(process.env.APP_DOMAIN);
    });
  });
});

export default router;