const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { 
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    emailId: {
        type: String,
        trim: true,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    businessName: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['venue', 'promoter', 'artist'],
        required: true,
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema);