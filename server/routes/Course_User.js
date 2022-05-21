const express = require('express');
const router = express.Router();
const { Course_User } = require('../models');
const { Chapter_User } = require('../models');
const { User } = require('../models');
const { Course } = require('../models');
const { Chapter } = require('../models');
const db = require('../models');

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const courses = await Course_User.findAll({
    where: { username: username },
    include: [
      {
        model: Course,
        attributes: ['course_name', 'question_all_count'],
      },
      { model: Chapter, attributes: ['chapter_name'] },
    ],
  });
  res.json(courses);
});

router.get('/courseId/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  const userInfo = await Course_User.findAll({
    where: { course_id: courseId },
    attributes: ['total_exp', 'username'],
    include: [{ model: User, attributes: ['name', 'profile_photo_path'] }],
  });
  res.json(userInfo);
});

router.post('/create', async (req, res) => {
  const { courseId, username } = req.body;
  await Course_User.create({
    course_id: courseId,
    username: username,
    current_chapter: 1,
    question_all_count: 100,
    question_learnt_count: 0,
    is_done: false,
    total_exp: 0,
  });
  const listChapter = await Chapter.findAll({ where: { course_id: courseId } });
  for (let i = 0; i < listChapter.length; i++) {
    await Chapter_User.create({
      chapter_id: listChapter[i].chapter_id,
      username: username,
      is_done: false
    })
  }
  res.json('OK');
});

// Lấy một khóa học có username và courseId
router.post('/', async (req, res) => {
  const { username, courseId } = req.body;
  const course = await Course_User.findOne({
    where: {
      username: username,
      course_id: courseId,
    },
    include: [
      {
        model: Course,
        attributes: ['question_all_count'],
      },
      { model: Chapter, attributes: ['chapter_name'] },
    ],
  });
  res.json(course);
});

// Update exp
router.post('/exp', async (req, res) => {
  const { username, courseId, exp, chapter_id, totalLesson } = req.body;

  const course = await Course_User.findOne({
    where: {
      username: username,
      course_id: courseId,
    },
  });
  let is_done = false;
  let current_chapter = course.current_chapter;
  // const result = await db.sequelize.query(
  //   `SELECT ch.course_id, count(chU.is_done) as totalNotDone
  // from chapters ch INNER JOIN chapter_users chU
  // on ch.chapter_id = chU.chapter_id
  // WHERE chU.username = '${username}' and chU.is_done = 0 and course_id = ${courseId}
  // ORDER BY ch.course_id`,
  //   { type: db.sequelize.QueryTypes.SELECT }
  // );

  const result = await db.sequelize.query(
    `SELECT ch.chapter_id, chU.is_done 
    from chapters ch INNER JOIN chapter_users chU 
    on ch.chapter_id = chU.chapter_id 
    WHERE chU.username = '${username}' and chU.is_done = 0 and course_id = ${courseId}`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  if (result.length > 0) {
    current_chapter = result[0].chapter_id;
  } else {
    is_done = true;
  }

  await Chapter_User.update(
    {
      is_done: true,
    },
    {
      where: { chapter_id: chapter_id, username: username },
    }
  );
  await Course_User.update(
    {
      total_exp: course.total_exp + exp,
      question_learnt_count: course.question_learnt_count + totalLesson,
      is_done: is_done,
      current_chapter: current_chapter,
    },
    {
      where: {
        username: username,
        course_id: courseId,
      },
    }
  );

  res.json(course);
});
module.exports = router;
