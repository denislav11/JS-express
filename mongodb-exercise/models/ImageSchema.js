const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let imageSchema = new mongoose.Schema({
    imageTitle: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String
    },
    tags: [{
        type: ObjectId
    }]
});

module.exports = mongoose.model('Image', imageSchema);