import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
  });
};

export const foregroundMessage = () => {
  messaging().onMessage(async (remoteMessage) => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
};

// foreground notification
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
