const Tag = require('../models/TagSchema');
const formidable = require('formidable');
const displayHome = require('../models/display-helper').displayHome;

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, file) => {

      Tag.create(fields)
        .then((tag) => {
          displayHome(req, res);
        })
        .catch((err) => console.log(err));
    })
  } else {
    return true
  }
}