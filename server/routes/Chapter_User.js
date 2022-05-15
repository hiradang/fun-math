const express = require('express');
const router = express.Router();
const { Chapter_User } = require('../models');
const db = require('../models');

router.get('/', async (req, res) => {
  const chapters = await Chapter_User.findAll();
  res.json(chapters);
});

// Get all chapter in one course of a person
router.post('/getAllChapter', async (req, res) => {
  const { username, courseId } = req.body;
  const result = await db.sequelize.query(
    `select ch.chapter_name, chu.is_done, chu.chapter_id from chapter_users chu inner join chapters ch on chu.chapter_id = ch.chapter_id
  inner join courses c on c.course_id = ch.course_id 
  where username = "${username}" and c.course_id = ${courseId}`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  res.json(result);
});

module.exports = router;
