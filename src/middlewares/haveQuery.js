const getTalkers = require('../utils/getTalkers');

const haveQuery = (req, res, next) => {
  const { q: searchTerm, rate: rateTerm } = req.query;
  const talkers = getTalkers();

  if (!searchTerm && !rateTerm) {
    return res.status(200).json(talkers);
  }

  next();
};

module.exports = haveQuery;