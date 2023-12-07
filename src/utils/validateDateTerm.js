const validateDateTerm = (date) => {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return datePattern.test(date);
};
module.exports = validateDateTerm;