const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controllers/SubscriptionController');

router.post('/', SubscriptionController.createSubscription);

module.exports = router;
