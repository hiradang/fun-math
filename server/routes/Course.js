const express = require('express');
const router = express.Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
});

router.get('/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByPk(courseId);
  res.json(course);
});

module.exports = router;
