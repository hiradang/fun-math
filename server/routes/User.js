const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Course } = require('../models');
const { Course_User } = require('../models');
const { Chapter_User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const defaultProfilePath =
  'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/defaultProfileImage.png?alt=media&token=790800d6-aac7-4359-a541-e73b3348e3cb';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username: username },
  });
  if (user) {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: 'Mật khẩu không chính xác' });
      else {
        let course = {};
        if (user.course_id != null) {
          course = await Course.findOne({
            where: { course_id: user.course_id },
          });
        }
        res.json({
          username: user.username,
          name: user.name,
          role_id: user.role_id,
          current_course_id: user.current_course_id,
          current_course_name: course != {} ? course.course_name : null,
          profile_photo_path: user.profile_photo_path,
          total_exp: user.total_exp,
          is_new_course_noti: user.is_new_course_noti,
          is_new_chapter_noti: user.is_new_chapter_noti,
          reminder_time: user.reminder_time,
        });
      }
    });
  } else {
    res.json({ error: 'Tài khoản chưa tồn tại' });
  }
});

router.post('/', async (req, res) => {
  const { username, password, role_id, name } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user) res.json({ error: 'Tên đăng nhập đã tồn tại' });
  else {
    bcrypt.hash(password, 10).then(async (hash) => {
      User.create({
        username: username,
        password: hash,
        role_id: role_id,
        name: name,
        total_exp: 0,
        profile_photo_path: defaultProfilePath,
        is_new_course_noti: false,
        is_new_chapter_noti: false,
      });
      // Course_User.create({
      //   course_id: 1,
      //   username: username,
      //   current_chapter: 0,
      //   question_all_count: 100,
      //   question_learnt_count: 0,
      //   is_done: false,
      //   total_exp: 0,
      // });
      // const listChapter = await Chapter.findAll({ where: { course_id: 1 } });
      // for (let i = 0; i < listChapter.length; i++) {
      //   await Chapter_User.create({
      //     chapter_id: listChapter[i].chapter_id,
      //     username: username,
      //     is_done: false,
      //   });
      // }
    });
    res.json('SUCCESS');
  }
});

// Change the current course that person is learning
router.post('/currentCourseName', async (req, res) => {
  const { username, currentCourseName, currentCourseId } = req.body;
  User.update(
    {
      current_course_id: currentCourseId,
    },
    { where: { username: username } }
  );
  res.json('OK');
});

router.post('/changePass', async (req, res) => {
  const { username, password, newPassword } = req.body;
  const user = await User.findByPk(username);
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: 'Mật khẩu không chính xác' });
      else {
        bcrypt.hash(newPassword, 10).then((hash) => {
          User.update(
            {
              password: hash,
            },
            {
              where: { username: username },
            }
          );
        });
        res.json('SUCCESS');
      }
    });
  } else {
    res.json({ error: 'Tài khoản chưa tồn tại' });
  }
});

// Update user info
router.post('/update', async (req, res) => {
  const {
    username,
    password,
    name,
    profilePhotoPath,
    isNewCourseNoti,
    isNewChapterNoti,
    reminderTime,
  } = req.body;
  const updateQuery = {};
  if (password) {
    await bcrypt.hash(password, 10).then((hash) => {
      updateQuery['password'] = hash;
    });
  }
  if (name) {
    updateQuery['name'] = name;
  }
  if (profilePhotoPath) {
    updateQuery['profile_photo_path'] = profilePhotoPath;
  }
  if (isNewCourseNoti !== null) {
    updateQuery['is_new_course_noti'] = isNewCourseNoti;
  }
  if (isNewChapterNoti !== null) {
    updateQuery['is_new_chapter_noti'] = isNewChapterNoti;
  }
  updateQuery['reminder_time'] = reminderTime;
  User.update(updateQuery, { where: { username: username } });
  res.json('OK');
});

// Get exp of all user
router.get('/getExp', async (req, res) => {
  const allUserExp = await User.findAll({
    where: { role_id: '0' },
    attributes: ['username', 'name', 'profile_photo_path', 'total_exp'],
  });
  res.json(allUserExp);
});

module.exports = router;
