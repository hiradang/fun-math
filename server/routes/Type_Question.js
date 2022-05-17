const express = require('express');
const router = express.Router();
const { Type_Question } = require('../models');


router.get('/:question_id', async (req, res) => {
  const question_id = req.params.question_id;
  const listQuestion = await Type_Question.findOne({
    where: { question_id: question_id },
  });
  res.json(listQuestion);
});

module.exports = router;
