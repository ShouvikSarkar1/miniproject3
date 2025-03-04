'use strict'

const Models = require('../models');

// Post Gigs CRUD
const getGigs = (res) => {
    Models.Gig.find({})
        .populate('user')
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const postGig = (data, res) => {
    console.log("Received Data:", data); // Check what data is coming in
    new Models.Gig(data)
        .save()
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const updateGig = (req, res) => {
    console.log(req.body);
    Models.Gig.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then((data) => res.send({ result: 200, data:data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
    });
};
const deleteGig = (req, res) => {
    Models.Gig.findOneAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


module.exports = { 
    getGigs,
    postGig,
    updateGig,
    deleteGig,

}