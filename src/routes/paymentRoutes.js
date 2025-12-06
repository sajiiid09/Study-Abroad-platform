const express = require('express');
const { protect } = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/my', protect, paymentController.getMyPayments);

module.exports = router;
