const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
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
            res.json({username: user.username, name: user.name})
            }
          });
    } else {
        res.json({error: 'Tài khoản chưa tồn tại'})
    }
  const users = await User.findAll();
  res.json(users);
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
      });
    });
    res.json('SUCCESS');
  }
});

module.exports = router;
