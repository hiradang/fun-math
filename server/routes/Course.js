const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const db = require('../models');

router.get('/', async (req, res) => {
  const result = await db.sequelize.query(
    `SELECT c.*, COUNT(ch.course_id) as totalChapter FROM courses c 
    LEFT JOIN chapters ch 
    on c.course_id = ch.course_id 
    GROUP BY c.course_id`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  res.json(result);
});

router.post('/', async (req, res) => {
  const { course_name } = req.body;
  const course = await Course.findOne({ where: { course_name: course_name } });
  if (course) {
    res.json({ error: 'Khóa học đã tồn tại' });
  } else {
    await Course.create({
      course_name: course_name,
      question_all_count: 0
    });
    const newCourse = await Course.findOne({ where: { course_name: course_name } });
    res.json(newCourse);
  }
});

router.post('/:course_id', async (req, res) => {
  const { course_name } = req.body;
  const course_id = req.params.course_id;
  const course = await Course.findOne({ where: { course_name: course_name } });
  if (course) {
    res.json({ error: 'Khóa học đã tồn tại' });
  } else {
    Course.update(
      {
        course_name: course_name,
      },
      { where: { course_id: course_id } }
    );
    res.json('SUCCESS');
  }
});

router.delete('/:course_id', async (req, res) => {
  const course_id = req.params.course_id;
  Course.destroy({ where: { course_id: course_id } });
  res.json('SUCCESS');
});

module.exports = router;
