const express = require('express');
const fs = require('fs');
const path = require('path');
const isAtuthorized = require('../middlewares/isAuthorization');
const getTalkers = require('../utils/getTalkers');
const haveQuery = require('../middlewares/haveQuery');
const validateRate = require('../middlewares/validadeteRate');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateWatchedAt = require('../middlewares/validateWatchAt');
const validateTalk = require('../middlewares/validateTalk');
const validateRateTerm = require('../utils/validateRateTerm');

const router = express.Router();

router.get('/', (req, res) => {
  const talkers = getTalkers();
  res.status(200).json(talkers);
});

router.get('/search', isAtuthorized, haveQuery, (req, res) => {
  const { q: searchTerm, rate: rateTerm } = req.query;
  const talkers = getTalkers();
  if (rateTerm && !validateRateTerm(rateTerm)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
  let filteredTalkers = talkers;
  if (searchTerm) {
    filteredTalkers = filteredTalkers
      .filter((talker) => talker.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (rateTerm) {
    filteredTalkers = filteredTalkers
      .filter((talker) => talker.talk.rate === Number(rateTerm));
  }
  return res.status(200).json(filteredTalkers);
});
  
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const talkers = getTalkers();
  const talker = talkers.find((t) => t.id === Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

router.post('/', 
  isAtuthorized, validateName, validateAge, validateTalk, validateRate, validateWatchedAt, 
  (req, res) => {
    const talker = req.body;
    const talkersFilePath = path.join(__dirname, '..', 'talker.json');
    const talkers = JSON.parse(fs.readFileSync(talkersFilePath, 'utf8'));
    const newTalker = { id: talkers.length + 1, ...talker };
    talkers.push(newTalker);
    fs.writeFileSync(talkersFilePath, JSON.stringify(talkers));
    res.status(201).json(newTalker);
  });

router.put('/:id', 
  isAtuthorized, validateName, validateAge, validateTalk, validateRate, validateWatchedAt, 
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkersFilePath = path.join(__dirname, '..', 'talker.json');
    const talkerData = fs.readFileSync(talkersFilePath, 'utf-8');
    const talkers = JSON.parse(talkerData);
    const talkerIndex = talkers.findIndex((t) => t.id === Number(id));

    if (talkerIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const updatedTalker = { id: Number(id), name, age, talk };
    talkers[talkerIndex] = updatedTalker;
    fs.writeFileSync(talkersFilePath, JSON.stringify(talkers));

    return res.status(200).json(updatedTalker);
  });

router.delete('/:id', isAtuthorized, (req, res) => {
  const { id } = req.params;
  const talkersFilePath = path.join(__dirname, '..', 'talker.json');
  const talkerData = fs.readFileSync(talkersFilePath, 'utf-8');
  const talkers = JSON.parse(talkerData);
  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));

  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  talkers.splice(talkerIndex, 1);
  fs.writeFileSync(talkersFilePath, JSON.stringify(talkers));

  return res.status(204).end();
});

module.exports = router;