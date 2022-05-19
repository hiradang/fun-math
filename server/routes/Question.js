const express = require('express');
const router = express.Router();
const { Question } = require('../models');
const { MultiChoice_Question } = require('../models');
const { Type_Question } = require('../models');

router.get('/image/:question_id', async (req, res) => {
  const question_id = req.params.question_id;
  const listQuestion = await Question.findByPk(question_id);
  res.json(listQuestion);
});

router.get('/all/:question_id', async (req, res) => {
  const question_id = req.params.question_id;
  const question = await Question.findByPk(question_id);
  const multiChoice = await MultiChoice_Question.findOne({where: {question_id: question_id}})
  const fillBox = await Type_Question.findOne({where: {question_id: question_id}})
  res.json({question, multiChoice, fillBox});
});

router.get('/:chapter_id', async (req, res) => {
  const chapter_id = req.params.chapter_id;
  const listQuestion = await Question.findAll({
    where: { chapter_id: chapter_id },
    attributes: ['question_id', 'question_name'],
  });
  res.json(listQuestion);
});

router.post('/', async (req, res) => {
  const { questionName, multiChoice, fillBox, chapter_id } = req.body;
  const question = await Question.findOne({ where: { question_name: questionName.question_name } });
  if (question) {
    res.json({ error: 'Bài học đã tồn tại' });
  } else {
    await Question.create({
      question_name: questionName.question_name,
      question_image: questionName.question_image,
      chapter_id: chapter_id,
    });
    const newQuestion = await Question.findOne({
      where: { question_name: questionName.question_name },
    });
    MultiChoice_Question.create({
      question: multiChoice.question,
      correct_answer: multiChoice.correct_answer,
      answers: multiChoice.answers,
      format_question: multiChoice.format_question,
      question_image: multiChoice.question_image,
      question_id: newQuestion.question_id,
    });
    Type_Question.create({
      question_name: fillBox.question_name,
      question: fillBox.question,
      correct_answer: fillBox.correct_answer,
      format_question: fillBox.format_question,
      question_id: newQuestion.question_id,
    });
    res.json(newQuestion);
  }
});

router.post('/:question_id', async (req, res) => {
  const { questionName, multiChoice, fillBox } = req.body;
  const question_id = req.params.question_id;
  const question = await Question.findOne({ where: { question_name: questionName.question_name } });
  if (question) {
    res.json({ error: 'Bài học đã tồn tại' });
  } else {
    await Question.update(
      {
        question_name: questionName.question_name,
        question_image: questionName.question_image,
      },
      { where: { question_id: question_id } }
    );
    MultiChoice_Question.update(
      {
        question: multiChoice.question,
        correct_answer: multiChoice.correct_answer,
        answers: multiChoice.answers,
        format_question: multiChoice.format_question,
        question_image: multiChoice.question_image,
      },
      { where: { question_id: question_id } }
    );
    Type_Question.update(
      {
        question_name: fillBox.question_name,
        question: fillBox.question,
        correct_answer: fillBox.correct_answer,
        format_question: fillBox.format_question,
      },
      { where: { question_id: question_id } }
    );
    res.json(newQuestion);
  }
});

router.delete('/:question_id', async (req, res) => {
  const question_id = req.params.question_id;
  Question.destroy({ where: { question_id: question_id } });
  MultiChoice_Question.destroy({ where: { question_id: question_id } });
  Type_Question.destroy({ where: { question_id: question_id } });
  res.json('SUCCESS');
});

module.exports = router;
