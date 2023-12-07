const validateDateTerm = require('../utils/validateDateTerm');
const validateRateTerm = require('../utils/validateRateTerm');

const validateDateTermAndRateTerm = (req, res, next) => {
  const { rate: rateTerm, date: dateTerm } = req.query;
  if (rateTerm && !validateRateTerm(rateTerm)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
  if (dateTerm && !validateDateTerm(dateTerm)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = validateDateTermAndRateTerm;