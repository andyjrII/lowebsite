const express = require('express');
const router = express.Router();

// Route definitions for each page
router.get('/', (req, res) => res.render('home'));
router.get('/about', (req, res) => res.render('about'));
router.get('/bio', (req, res) => res.render('bio'));
router.get('/books', (req, res) => res.render('books'));
router.get('/company', (req, res) => res.render('company'));
router.get('/blog', (req, res) => res.render('blog'));
router.get('/contact', (req, res) => res.render('contact'));
router.post('/newsletter-signup', (req, res) => {
  const email = req.body.email;
  // Handle the email (e.g., save to database, send confirmation)
  res.send('Thank you for signing up!');
});

router.get('/testimonials', (req, res) => res.render('testimonials'));
router.get('/privacy-policy', (req, res) => res.render('privacy_policy'));
router.get('/terms-of-use', (req, res) => res.render('terms_of_use'));
router.get('/privacy-policy', (req, res) => res.render('privacy_policy'));
router.get('/copyright', (req, res) => res.render('copyright'));

module.exports = router;
