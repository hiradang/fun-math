const express = require('express');
const router = express.Router();
const { Course_User } = require('../models');
const { Chapter_User } = require('../models');
const { User } = require('../models');
const { Course } = require('../models');

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const courses = await Course_User.findAll({
    where: { username: username },
    include: [{ model: Course, attributes: ['course_name'] }],
  });
  res.json(courses);
});

// Bảng xếp hạng trong một khóa học
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
  Course_User.create({
    course_id: courseId,
    username: username,
    current_chapter: 1,
    question_all_count: 100,
    question_learnt_count: 0,
    is_done: false,
    total_exp: 0,
  });
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
  });
  res.json(course);
});

// Update exp
router.post('/exp', async (req, res) => {
  const { username, courseId, exp, chapter_id } = req.body;
  const course = await Course_User.findOne({
    where: {
      username: username,
      course_id: courseId,
    },
  });
  await Chapter_User.update({
    is_done: true
  }, {
    where: {chapter_id: chapter_id, username: username}
  })
  await Course_User.update(
    {
      total_exp: course.total_exp + exp,
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

