const express = require('express');
const router = express.Router();
const { Question } = require('../models');

router.get('/image/:question_id', async (req, res) => {
  
  const question_id = req.params.question_id;
  const listQuestion = await Question.findByPk(question_id);
  console.log(listQuestion)
  res.json(listQuestion);
});

router.get('/:chapter_id', async (req, res) => {
  console.log(2)
  const chapter_id = req.params.chapter_id;
  const listQuestion = await Question.findAll({
    where: { chapter_id: chapter_id },
    attributes: ['question_id', 'question_name'],
  });
  res.json(listQuestion);
});

module.exports = router;
