const notANumber = (num) => typeof num !== 'number';
const isntInRange = (num) => num < 1 || num > 5;
const isInteger = (num) => num % 1 !== 0;

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (notANumber(talk.rate) || isntInRange(talk.rate) || isInteger(talk.rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
  next();
};

module.exports = validateRate;