const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gigSchema = new Schema({
    gigTitle: {
        type: String,
        trim: true,
        required: true,
    },
    gigDate: {
        type: String,
        required: true,
    },
    gigDescription: {
        type: String,
        trim: true,
        required: true,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    comments: [
        {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        text: { type: String, required: true},
    }
],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);