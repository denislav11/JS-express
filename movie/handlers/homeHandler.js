const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home.html'));

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
        })
    } else {
        return true;
    }
}