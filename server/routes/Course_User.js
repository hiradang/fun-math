const express = require('express');
const router = express.Router();
const { Course_User } = require('../models');
const { User } = require('../models');

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const courses = await Course_User.findAll({ where: { username: username } });
  res.json(courses);
});

router.get('/courseId/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  const userInfo = await Course_User.findAll({
    where: { course_id: courseId },
    attributes: ['total_exp', 'username'],
    // profile_photo_path, name
    include: [{ model: User, attributes: ['name', 'profile_photo_path'] }],
  });
  res.json(userInfo);
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

module.exports = router;
