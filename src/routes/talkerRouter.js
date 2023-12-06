const express = require('express');
const fs = require('fs');
const path = require('path');
const isAtuthorized = require('../middlewares/isAuthorization');
const validateTalker = require('../middlewares/validateTalker');
const getTalkers = require('../utils/getTalkers');

const router = express.Router();

router.get('/', (req, res) => {
  const talkers = getTalkers();
  res.status(200).json(talkers);
});

router.get('/search', isAtuthorized, (req, res) => {
  const searchTerm = req.query.q;
  const talkers = getTalkers();

  if (!searchTerm) {
    return res.status(200).json(talkers);
  }

  const filteredTalkers = talkers
    .filter((talker) => talker.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

router.post('/', isAtuthorized, validateTalker, (req, res) => {
  const talker = req.body;
  const talkersFilePath = path.join(__dirname, '..', 'talker.json');
  const talkers = JSON.parse(fs.readFileSync(talkersFilePath, 'utf8'));
  const newTalker = { id: talkers.length + 1, ...talker };
  talkers.push(newTalker);
  fs.writeFileSync(talkersFilePath, JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

router.put('/:id', isAtuthorized, validateTalker, (req, res) => {
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