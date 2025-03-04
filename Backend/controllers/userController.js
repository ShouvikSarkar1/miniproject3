'use strict'
let Models = require('../models')

const getUsers = (res) => {
    Models.User.find({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const createUser = (data, res) => {
    console.log(data)
    new Models.User(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message})
        })
}

const loginUser = async (userData, res) => {
    try {
        const { emailId, password } = userData;

        const user = await Models.User.findOne({ emailId });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }
        res.json({ message: 'Login successful!', user: { id: user._id, emailId: user.emailId, role: user.role, name: user.firstName }})
    }catch (error) {
        res.status(500).json({ message: 'Server error '})
    }
}

const updateUser = (req, res) => {
    console.log(req.body)
    Models.User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data}))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message})
        })
}

const deleteUser = (req, res) => {
    Models.User.findByIdAndDelete(req.params.id)
        .then(data => res.send({ result: 200, data: data}))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message})
        })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
}