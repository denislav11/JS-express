const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let tagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        require: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    images: [{
        type: ObjectId
    }]
});
tagSchema.pre('save', function (next) {
    this.tagName = this.tagName.toLowerCase();
    next()
});

module.exports = mongoose.model('Tag', tagSchema);