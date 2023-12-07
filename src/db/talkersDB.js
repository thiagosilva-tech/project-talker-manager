const connection = require('./connection');

const getAllTalkers = async () => {
  const [allTalkers] = await connection.execute('SELECT * FROM talkers');
  return allTalkers;
};
module.exports = {
  getAllTalkers,
};