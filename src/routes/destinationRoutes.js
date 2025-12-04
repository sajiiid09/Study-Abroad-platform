const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router();

router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestinationById);

module.exports = router;
