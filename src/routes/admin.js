const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { ensureAuthenticated } = require('../middleware/auth');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Handle Login
router.get('/login', (req, res) => res.render('login'));
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true,
  })
);

// Subscribers
router.get('/', ensureAuthenticated, AdminController.getDashboard);
router.get(
  '/subscribers',
  ensureAuthenticated,
  AdminController.getSubscriptions
);

// Books
router.get('/books', ensureAuthenticated, AdminController.getBooks);
router.get('/books/add', ensureAuthenticated, AdminController.getAddBook);
router.post(
  '/books/add',
  upload.single('coverImage'),
  AdminController.postAddBook
);
router.post(
  '/books/delete/:id',
  ensureAuthenticated,
  AdminController.deleteBook
);
router.get('/books/edit/:id', ensureAuthenticated, AdminController.getEditBook);
router.post(
  '/books/edit/:id',
  ensureAuthenticated,
  upload.single('coverImage'),
  AdminController.postEditBook
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
