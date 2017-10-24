const http = require('http');
const port = 23213;

const handlers = require('./handlers/handler');

http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }; 
    }
}).listen(port);