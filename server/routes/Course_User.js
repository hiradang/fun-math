const express = require('express');
const router = express.Router();
const { Course_User } = require('../models');

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const courses = await Course_User.findAll({ where: { username: username } });
  res.json(courses);
});

// Lấy một khóa học có username và courseName
router.post('/', async (req, res) => {
  const { username, courseName } = req.body;
  const course = await Course_User.findOne({
    where: {
      username: username,
      course_name: courseName,
    },
  });
  res.json(course);
});

module.exports = router;
