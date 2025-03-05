let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');
const Gig = require('../models/gigPost');

// Gig Post Routes
router.get('/', (req, res) => {
    Controllers.gigController.getGigs(res);
});

router.post('/postGig', async (req, res) => {
    console.log('Received data:', req.body); // Log incoming data
    try {
      const newGig = new Gig(req.body); 
      await newGig.save();
      res.status(201).json(newGig); // Send back the newly created gig
    } catch (error) {
      console.error('Error creating gig:', error);
      res.status(500).json({ message: error.message }); // Send error response
    }
  });

router.put('/:id', (req, res) => {
    Controllers.gigController.updateGig(req, res);
});

router.delete('/:id', (req, res) => {
    Controllers.gigController.deleteGig(req, res);
});

module.exports = router;