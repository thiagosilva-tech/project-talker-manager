const validateName = (name, res) => {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const isInteger = (num) => num % 1 !== 0;
  
const validateAge = (age, res) => {
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age !== 'number' || age < 18 || isInteger(age)) {
    return res.status(400).json({ 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
};

const validateWatchedAt = (watchedAt, res) => {
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!/^(\d{2}\/\d{2}\/\d{4})$/.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const notANumber = (num) => typeof num !== 'number';
const isntInRange = (num) => num < 1 || num > 5;

const validateRate = (rate, res) => {
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (notANumber(rate) || isntInRange(rate) || isInteger(rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
};
  
const validateTalk = (talk, res) => {
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  validateWatchedAt(talk.watchedAt, res);
  validateRate(talk.rate, res);
};
  
const validateTalker = (req, res, next) => {
  const { name, age, talk } = req.body;
  
  validateName(name, res);
  validateAge(age, res);
  validateTalk(talk, res);
  
  next();
};

module.exports = validateTalker;
