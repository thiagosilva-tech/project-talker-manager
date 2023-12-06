const fs = require('fs');
const path = require('path');

const getTalkers = () => {
  const talkersFilePath = path.join(__dirname, '..', 'talker.json');
  const talkerData = fs.readFileSync(talkersFilePath, 'utf-8');
  return JSON.parse(talkerData);
};

module.exports = getTalkers;