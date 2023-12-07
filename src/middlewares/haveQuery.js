const getTalkers = require('../utils/getTalkers');

const haveQuery = (req, res, next) => {
  const { q: searchTerm, rate: rateTerm, date: dateTerm } = req.query;
  const talkers = getTalkers();

  if (!searchTerm && !rateTerm && !dateTerm) {
    return res.status(200).json(talkers);
  }

  next();
};

module.exports = haveQuery;