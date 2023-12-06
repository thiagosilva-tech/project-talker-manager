const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  const talkersFilePath = path.join(__dirname, 'talker.json');
  const talkerData = fs.readFileSync(talkersFilePath, 'utf-8');
  const talkers = JSON.parse(talkerData);

  res.status(200).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
