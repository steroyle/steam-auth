import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }));

router.get('/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  res.redirect(process.env.APP_DOMAIN);
});

router.get('/steam/status', (req, res) => {
  console.log(req)
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user:req.user,
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

export default router;