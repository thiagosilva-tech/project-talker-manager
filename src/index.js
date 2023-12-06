const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkersFilePath = path.join(__dirname, 'talker.json');
  const talkerData = fs.readFileSync(talkersFilePath, 'utf-8');
  const talkers = JSON.parse(talkerData);

  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
