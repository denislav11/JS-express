const url = require('url');
const fs = require('fs');

module.exports = (req, res) => {
    req.pathname = url.parse(req.url).pathname;
    if (req.pathname.startsWith('/download/') && req.method === 'GET') {
        let file = fs.createReadStream(req.pathname.replace('/download/', ''));
        file.on('data', data => res.write(data));
        file.on('end', () => res.end())
    } else {
        return true;
    }
}