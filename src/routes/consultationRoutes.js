const express = require('express');
const consultationController = require('../controllers/consultationController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/', consultationController.createConsultation);
router.get('/my', protect, consultationController.getMyConsultations);

module.exports = router;
