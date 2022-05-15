const express = require('express');
const router = express.Router();
const { Chapter } = require('../models');

router.get('/', async (req, res) => {
  const chapters = await Chapter.findAll();
  res.json(chapters);
});

module.exports = router;
