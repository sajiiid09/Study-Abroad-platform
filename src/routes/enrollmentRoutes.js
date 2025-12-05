const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, enrollmentController.initiateEnrollment);
router.post('/:id/confirm-payment', protect, enrollmentController.confirmPayment);
router.get('/my', protect, enrollmentController.getMyEnrollments);
router.delete('/:id', protect, enrollmentController.cancelEnrollment);

module.exports = router;
