const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controllers/SubscriptionController');
const BookController = require('../controllers/BookController');
const IndexController = require('../controllers/IndexController');

// Route definitions for each page
router.get('/', IndexController.getLinks);
router.get('/about', (req, res) => res.render('about'));
router.get('/bio', (req, res) => res.render('bio'));
router.get('/books', BookController.getBooks);
router.get('/organisations', IndexController.getOrgLinks);
router.get('/blog', (req, res) => res.render('blog'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/testimonials', (req, res) => res.render('testimonials'));
router.get('/privacy-policy', (req, res) => res.render('privacy_policy'));
router.get('/terms-of-use', (req, res) => res.render('terms_of_use'));
router.get('/copyright', (req, res) => res.render('copyright'));

router.post('/subscribe', SubscriptionController.createSubscription);

module.exports = router;
