let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');

// Gig Post Routes
router.get('/', (req, res) => {
    Controllers.gigController.getGigs(res);
});

router.post('/postGig', (req, res) => {
    Controllers.gigController.postGig(req.body, res);
});

router.put('/:id', (req, res) => {
    Controllers.gigController.updateGig(req, res);
});

router.delete('/:id', (req, res) => {
    Controllers.gigController.deleteGig(req, res);
});

module.exports = router;