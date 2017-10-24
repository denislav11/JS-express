const url = require('url');
const path = require('path');
const fs = require('fs');
const db = require('../config/dataBase');
const formidable = require('formidable');
const shortid = require('shortid');

module.exports.viewAll = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    let filePath = path.normalize(
        path.join(__dirname, '../views/viewAll.html'));

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let memesAsString = '';

        for (let meme of db.getDb()) {
            memesAsString += `<div class="meme">
          <a href="/getDetails?id=${meme.id}">
          <img class="memePoster" src="${meme.memeSrc}"/>          
            </div>`
        }
        data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', memesAsString);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    })
}

module.exports.getDetails = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    let filePath = path.normalize(
        path.join(__dirname, '../views/details.html'));

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let id = (url.parse(req.url).query).split('=')[1];
        let targetedMeme = db.getMeme(id);

        let memeAsHtml = `<div class="content">
                <img src="${targetedMeme.memeSrc}" alt=""/>
                <h3>Title  ${targetedMeme.title}</h3>
                <p> ${targetedMeme.description}</p>
                <button><a href="/download/${targetedMeme.memeSrc}">Download Meme</a></button>
                </div>`

        data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', memeAsHtml);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    })
}

module.exports.viewAddMeme = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    let filePath = path.normalize(
        path.join(__dirname, '../views/addMeme.html'));

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    })
}

module.exports.addMeme = (req, res) => {
    let form = new formidable.IncomingForm();

    let id = shortid.generate();
    let imageId = shortid.generate();
    let index = Math.ceil(db.getDb().length / 10);
    let imagePath = `./public/memeStorage/${index}/`;

    if (fs.exists(imagePath, (exists) => {
            if (!exists) {
                fs.mkdirSync(imagePath);
            }
        }));

    form.on('fileBegin', (name, file) => {
        file.path = imagePath + imageId + '.jpeg';
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }

        let meme = {
            id: id,
            title: fields.memeTitle,
            memeSrc: imagePath + imageId + '.jpeg',
            description: fields.memeDescription,
            privacy: fields.status,
            dateStamp: Date.now()
        };

        db.add(meme);
        db.save().then(() => {
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        }).catch((err) => {
            console.log(err);
            return;
        })
    })
}