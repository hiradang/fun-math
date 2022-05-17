const express = require('express');
const router = express.Router();
const { MultiChoice_Question } = require('../models');

router.get('/image/:question_id', async (req, res) => {
  const question_id = req.params.question_id;
  const listQuestion = await MultiChoice_Question.findOne({
    where: { question_id: question_id },
  });
  res.json(listQuestion);
});

router.get('/:question_id', async (req, res) => {
  const question_id = req.params.question_id;
  const listQuestion = await MultiChoice_Question.findAll({
    where: { question_id: question_id },
  });
  res.json(listQuestion);
});

module.exports = router;
