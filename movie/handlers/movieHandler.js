const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addMovie.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let movies = qs.parse(body);

            let filePath = path.normalize(
                path.join(__dirname, '../views/addMovie.html'));

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                let stringToReplace = '<div id="replaceMe">{{replaceMe}}</div>';

                if (movies.moviePoster === '' || movies.movieTitle === '') {
                    data = data.replace(stringToReplace, '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                } else {
                    database.push(movies);

                    data = data.replace(stringToReplace, '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
                    res.writeHead(201, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                }
            })
        });
    } else {
        return true;
    }
}