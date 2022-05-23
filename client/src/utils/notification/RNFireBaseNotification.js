import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';

export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Background notification');
  });
};

export const onNotificationOpenedApp = ({ navigation }) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    navigation.navigate('ListCourses');
  });
};

export const subscribeToTopic = (topic) => {
  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log(`Subscribed to topic: ${topic}!`));
};

export const unsubscribeFromTopic = (topic) => {
  messaging()
    .unsubscribeFromTopic(topic)
    .then(() => console.log(`Unsubscribed from the topic: ${topic}!`));
};

export const triggerNotification = ({ topic, courseName, chapterName }) => {
  axios.post(`${Config.API_URL}/notification`, { topic, courseName, chapterName }).then(() => {});
};
