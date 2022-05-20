const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  var notification = {
    title: 'Database',
    text: 'Sample content',
  };
  var fcm_token = [];

  const notification_body = {
    to: '/topics/topic',
    // registration_ids: fcm_token,
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
