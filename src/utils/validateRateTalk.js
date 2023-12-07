const notANumber = (num) => typeof num !== 'number';
const isntInRange = (num) => num < 1 || num > 5;
const isInteger = (num) => num % 1 !== 0;

const validateRateTalk = (rate) => {
  if (rate === undefined) return { status: 400, message: 'O campo "rate" é obrigatório' };
  if (notANumber(rate) || isntInRange(rate) || isInteger(rate)) {
    return { status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' };
  }
  return null;
};

module.exports = validateRateTalk;