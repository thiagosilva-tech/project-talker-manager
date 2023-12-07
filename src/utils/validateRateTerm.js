const validateRateTerm = (rate) => {
  const rateNumber = Number(rate);
  return Number.isInteger(rateNumber) && rateNumber >= 1 && rateNumber <= 5;
};

module.exports = validateRateTerm;
