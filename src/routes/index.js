const express = require('express');
const healthController = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const destinationRoutes = require('./destinationRoutes');
const consultationRoutes = require('./consultationRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');

const router = express.Router();

router.get('/health', healthController.getHealth);
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/destinations', destinationRoutes);
router.use('/consultations', consultationRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/enrollments', enrollmentRoutes);

module.exports = router;
