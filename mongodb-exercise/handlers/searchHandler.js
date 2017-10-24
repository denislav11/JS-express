const url = require('url');
const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema');
const displayImages = require('../models/display-helper').displayImages;

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    let query = url.parse(req.url, true).query;
    let tags = query.tagName.split(',');
    let limit = Number(query.Limit);

    let afterDate;
    let beforeDate;

    if (query.afterDate !== '') {
      afterDate = new Date(query.afterDate);
    }
    if (query.beforeDate !== '') {
      beforeDate = new Date(query.beforeDate);
    }
    let params = {};
    if (query.tagName !== '') {
      params = {
        tagName: {
          $in: tags
        }
      };
    }

    Tag.find(params)
      .select('images')
      .then((imagesData) => {

        let imageIds = [];
        for (let obj of imagesData) {
          for (let im of obj.images) {
            imageIds.push(im);
          }
        }
        Image.find({
            _id: {
              $in: imageIds
            }
          })
          .where('creationDate').gt(afterDate)
          .where('creationDate').lt(beforeDate)
          .limit(limit)
          .then((data) => {
            displayImages(req, res, data);
          });
      });
  } else {
    return true
  }
}