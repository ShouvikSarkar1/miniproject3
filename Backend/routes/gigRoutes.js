let express = require('express');
let router = express.Router();
let Controllers = require('../controllers');

router.get('/', (req, res) => {
    Controllers.gigController.getGigs(res);
});

router.post('/postGig', (req, res) => {
    Controllers.gigController.postGig(req.body, res);
});

router.put('/:id/like', (req, res) => {
    Controllers.gigController.likePost(req.params.id. req.bodyuserId, res)
});

router.post('/:id/comment', (req, res) => {
    Controllers.gigController.addComment(req.params.id, req.body, res);
})

module.exports = router;