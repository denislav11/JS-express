const url = require('url');
const fs = require('fs');
const path = require('path');
const database = require('../config/dataBase');

function getIndex(url) {
    let index = url.lastIndexOf('/');
    return url.slice(index + 1, url.lenght);
}

module.exports = (req, res) => {
    req.pathname = url.parse(req.url).pathname;

    if (req.pathname.startsWith('/movies/details') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/details.html'));

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let index = Number(getIndex(req.pathname));
            let movie = database[index];

            let movieAsHtml = `<div class="content">
                <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
                <h3>Title  ${decodeURIComponent(movie.movieTitle)}</h3>
                <h3>Year ${movie.movieYear}</h3>
                <p> ${movie.movieDescription}</p>
                    </div>`;

            data = data.replace('{{replaceMe}}', movieAsHtml);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}