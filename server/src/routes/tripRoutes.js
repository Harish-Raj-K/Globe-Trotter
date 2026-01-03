const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate); // Protect all trip routes

router.post('/', tripController.createTrip);
router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

router.post('/:id/destinations', tripController.addDestination);
router.post('/:id/items', tripController.addItem);
router.delete('/:id/items/:itemId', tripController.deleteItem);

module.exports = router;
