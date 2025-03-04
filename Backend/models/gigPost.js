const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gigSchema = new Schema({
    gigTitle: {
        type: String,
        trim: true,
        required: true,
    },
    gigDate: {
        type: Date,
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
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);