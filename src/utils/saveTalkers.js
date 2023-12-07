const fs = require('fs');
const path = require('path');

const saveTalkers = (talkers) => {
  const talkersFilePath = path.join(__dirname, '..', 'talker.json');
  fs.writeFileSync(talkersFilePath, JSON.stringify(talkers));
};

module.exports = saveTalkers;