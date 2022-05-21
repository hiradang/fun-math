const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { topic, courseName, chapterName } = req.body;
  let notification;

  if (topic === 'new-course') {
    notification = {
      title: 'Khóa học mới',
      body: `FunMath đã có thêm khóa học ${courseName}. Chinh phục ngay thôi nào!`,
    };
  } else if (topic === 'new-chapter') {
    notification = {
      title: 'Chương học mới',
      body: `Bắt đầu học ngay ${chapterName} trong khóa ${courseName} cùng FunMath nào!`,
    };
  }

  const notification_body = {
    to: `/topics/${topic}`,
    notification: notification,
  };

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization:
        'key=' +
        'AAAAj0GfF4E:APA91bG8MVrXw4YwOO0BVsXHfprWRa5KB0pL7wEmFfWFEMvp0jA4DU9_S6gc1Ibm3Ljf_kap8k71MMWR-mw3gUbSBWgZGDWXqvVordZl7gLqxmaSv-LNcto3cnZbFk0g-dhpy9CXDakn',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification_body),
  })
    .then(() => {
      res.status(200).send('Notification sent successfully!');
    })
    .catch((err) => {
      res.status(400).send('Something went wrong');
      console.log(err);
    });
});

module.exports = router;
