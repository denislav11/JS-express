const homeHandler = require('./homeHandler')
const memeHandler = require('./memeHandler')
const staticHandler = require('./staticHandler')
const downloadHandler = require('./downloadHandler');

module.exports = [homeHandler, memeHandler, downloadHandler, staticHandler]