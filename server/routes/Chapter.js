const express = require('express');
const router = express.Router();
const { Chapter } = require('../models');

router.get('/', async (req, res) => {
  const result = await db.sequelize.query(
    `SELECT c.*, COUNT(q.chapter_id) as totalLesson FROM chapters c 
    INNER JOIN questions q
    on c.chapter_id = q.chapter_id 
    GROUP BY c.chapter_id`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  res.json(result);
});

router.post('/', async (req, res) => {
  const {course_id, chapter_name} = req.body
  Chapter.create({
    chapter_name: chapter_name,
    course_id: course_id
  })
  res.json('SUCCESS');
});

router.post('/:chapter_id', async (req, res) => {
  const { chapter_name } = req.body;
  const chapter_id = req.params.chapter_id;
  Chapter.update(
    {
      chapter_name: chapter_name,
    },
    { where: { chapter_id: chapter_id } }
  );
  res.json('SUCCESS');
});

router.delete('/:chapter_id', async (req, res) => {
  const chapter_id = req.params.chapter_id;
  Course.destroy({ where: { chapter_id: chapter_id } });
  res.json('SUCCESS');
});

module.exports = router;
