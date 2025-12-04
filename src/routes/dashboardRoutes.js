const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/overview', protect, dashboardController.getOverview);

module.exports = router;
