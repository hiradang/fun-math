import PushNotification from 'react-native-push-notification';

export const createChannel = () => {
  PushNotification.createChannel({
    channelId: 'reminder',
    channelName: 'Reminder Channel',
  });
};
