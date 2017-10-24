const formidable = require('formidable');
const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema');
const displayHome = require('../models/display-helper').displayHome;

module.exports.addImage = (req, res) => {

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        fields.tags = fields.tagsID.split(',');
        fields.tags.pop();

        delete fields.tagsID;

        Image.create(fields).then((img) => {
            let tags = img.tags;

            Tag.update({
                _id: {
                    $in: tags
                }
            }, {
                $push: {
                    images: img._id
                }
            }, {
                milti: true
            }).then((count) => {
                displayHome(req, res);
            }).catch(err => console.log(err))
        })
    })
}