const url = require('url');
const path = require('path');
const fs = require('fs');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/viewAll.html'));
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let urls = '';

            for (let i = 0; i < database.length; i++) {
                let currentUrl = decodeURIComponent(database[i].moviePoster);
                urls += `<div class="movie">
                         <a href = "/movies/details/${i}"><img class="moviePoster" src="${currentUrl}"/></a>          
                         </div>\br`;
            }

            data = data.replace('{{replaceMe}}', urls);
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}