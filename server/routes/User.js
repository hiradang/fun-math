const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: 'Mật khẩu không chính xác' });
      else {
        //   const accessToken = jwt.sign({ id: user.username, role: user.role }, 'importantsecret', {
        //     expiresIn: '24h',
        //   });
        //   res.cookie('token', accessToken);
        //  res.json({ username: user.username, role: user.role, accessToken });
        res.json({
          username: user.username,
          name: user.name,
          role_id: user.role_id,
          current_course_name: user.current_course_name,
          current_course_id: user.current_course_id,
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
    bcrypt.hash(password, 10).then((hash) => {
      User.create({
        username: username,
        password: hash,
        role_id: role_id,
        name: name,
        current_course_name: 'Phép cộng',
        current_course_id: 1,
        total_exp: 0,
      });
    });
    res.json('SUCCESS');
  }
});

// Change the current course that person is learning
router.post('/currentCourseName', async (req, res) => {
  const { username, currentCourseName, currentCourseId } = req.body;
  User.update(
    {
      current_course_name: currentCourseName,
      current_course_id: currentCourseId,
    },
    { where: { username: username } }
  );
  res.json('OK');
});

router.put('updatePass', async (req, res) => {
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
      }
    });
    res.json('SUCCESS');
  } else {
    res.json({ error: 'Tài khoản chưa tồn tại' });
  }
});
// Update user info
router.post('/update', async (req, res) => {
  const { username, password, name, profilePhotoPath } = req.body;
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
  User.update(updateQuery, { where: { username: username } });
  res.json(updateQuery);
});

// Get exp of all user
router.get('/getExp', async (req, res) => {
  const allUserExp = await User.findAll({
    attributes: ['username', 'name', 'profile_photo_path', 'total_exp'],
  });
  res.json(allUserExp);
});
module.exports = router;
