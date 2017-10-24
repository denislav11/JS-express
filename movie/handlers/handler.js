const homeHandler = require('./homeHandler');
const staticHandler = require('./staticHandler');
const faviconHandler = require('./faviconHandler');
const movieHandler = require('./movieHandler');
const allMoviesHandler = require('./allMoviesHandler');
const movieDetailsHandler = require('./movieDetailsHandler');
const headerHandler = require('./headerHandler.js');

module.exports = [
    homeHandler,
    faviconHandler,
    movieHandler,
    allMoviesHandler,
    movieDetailsHandler,
    headerHandler,
    staticHandler
];