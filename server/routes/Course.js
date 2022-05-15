const express = require('express');
const router = express.Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
});

module.exports = router;
