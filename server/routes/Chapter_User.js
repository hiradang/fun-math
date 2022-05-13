const express = require('express');
const router = express.Router();
const { Chapter_User } = require('../models');

router.get('/', async (req, res) => {
  const chapters = await Chapter_User.findAll();
  res.json(chapters);
});

// Get all chapter in one course of a person
router.post('/getAllChapter', async (req, res) => {
  const { username, course_id } = req.body;
  const chapters = await Chapter_User.findAll({
    where: { username: username, course_id: course_id },
  });
  res.json(chapters);
});

module.exports = router;
