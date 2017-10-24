const Tag = require('../models/TagSchema');
const fs = require('fs');

module.exports.displayHome = (req, res) => {

    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        let dispalyTags = ''

        Tag.find({}).then(tags => {
            for (let tag of tags) {
                dispalyTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`
            }
            data = data
                .toString()
                .replace(`<div class='replaceMe'></div>`, dispalyTags)
            res.end(data)
        })
    })
}

module.exports.displayImages = (req, res, images) => {
    fs.readFile('./views/results.html', 'utf8', (err, data) => {
        let imagesAsHtml = '';

        for (let image of images) {
            imagesAsHtml +=
                `<fieldset id => <legend>${image.imageTitle}:</legend> 
                <img src="${image.imageUrl}">
                </img><p>${image.description}<p/>
                <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                </button> 
                </fieldset>`
        };

        data = data.replace("<div class='replaceMe'></div>", imagesAsHtml);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    })
}