const fs = require('fs');
const url = require('url');
const path = require('path');

function getContent(path) {
    let content;
    let types = {
        '.css': 'text/css',
        '.ico': 'image/x-icon',
        '.png': 'image/png'
    };
    for (let type in types) {
        if (path.endsWith(type)) {
            content = types[type];
        }
    }
    return content;
}

module.exports = (req, res) => {
    req.pathname = url.parse(req.url).pathname;

    if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../' + req.pathname));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': getContent(req.pathname)
            });
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}