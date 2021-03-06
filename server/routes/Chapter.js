const express = require('express');
const router = express.Router();
const { Chapter } = require('../models');
const { Chapter_User } = require('../models');
const db = require('../models');
const { Course_User } = require('../models');

router.get('/:course_id', async (req, res) => {
  const course_id = req.params.course_id;
  const result = await db.sequelize.query(
    `SELECT c.*, COUNT(q.chapter_id) as totalLesson FROM chapters c 
    LEFT JOIN questions q
    on c.chapter_id = q.chapter_id where c.course_id = ${course_id}
    GROUP BY c.chapter_id `,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  res.json(result);
});

router.post('/', async (req, res) => {
  const { chapter_name, course_id } = req.body;
  const chapter = await Chapter.findOne({ where: { chapter_name: chapter_name } });
  if (chapter) {
    res.json({ error: 'Chương học đã tồn tại' });
  } else {
    await Chapter.create({
      chapter_name: chapter_name,
      course_id: course_id,
      question_all_count: 0,
    });
    const newChapter = await Chapter.findOne({ where: { chapter_name: chapter_name } });
    const listUser = await Course_User.findAll({ where: { course_id: course_id } });
    for (let i = 0; i < listUser.length; i++) {
      await Chapter_User.create({
        chapter_id: newChapter.chapter_id,
        username: listUser[i].username,
        is_done: false
      })
    }
    
    res.json(newChapter);
  }
});

router.post('/:chapter_id', async (req, res) => {
  const { chapter_name } = req.body;
  const chapter_id = req.params.chapter_id;
  const chapter = await Chapter.findOne({ where: { chapter_name: chapter_name } });
  if (chapter) {
    res.json({ error: 'Chương học đã tồn tại' });
  } else {
    Chapter.update(
      {
        chapter_name: chapter_name,
      },
      { where: { chapter_id: chapter_id } }
    );
    res.json('SUCCESS');
  }
});

router.delete('/:chapter_id', async (req, res) => {
  const chapter_id = req.params.chapter_id;
  Chapter.destroy({ where: { chapter_id: chapter_id } });
  res.json('SUCCESS');
});

module.exports = router;
