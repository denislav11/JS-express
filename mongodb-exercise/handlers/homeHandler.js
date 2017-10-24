const displayHome = require('../models/display-helper').displayHome;

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    displayHome(req, res);
  } else {
    return true
  }
}