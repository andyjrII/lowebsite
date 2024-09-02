const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { ensureAuthenticated } = require('../middleware/auth');
const passport = require('passport');

router.get('/', ensureAuthenticated, AdminController.getSubscriptions);
router.get('/login', (req, res) => res.render('login'));

// Handle Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true,
  })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    res.redirect('/admin/login');
  });
});

module.exports = router;
