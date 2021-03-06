import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {
  subscribeToTopic,
  unsubscribeFromTopic,
} from '../utils/notification/RNFireBaseNotification';
import Config from 'react-native-config';
import DateTimePicker from '@react-native-community/datetimepicker';
import ConfirmModal from '../utils/ConfirmModal';

function Setting({ navigation }) {
  const { currentCourseId, username } = useSelector((state) => state.taskReducer);

  const [isNewCourseNoti, setNotiNewCourse] = useState();
  const [isNewChapterNoti, setNotiNewChapter] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isRemind, setRemind] = useState(false);
  const [myDate, setMyDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [reminderHour, setReminderHour] = useState('');
  const [reminderMinute, setReminderMinute] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      const data = JSON.parse(user);
      setNotiNewCourse(data.isNewCourseNoti);
      setNotiNewChapter(data.isNewChapterNoti);

      if (data.reminderTime) {
        setReminderHour(Math.floor(data.reminderTime / 60));
        setReminderMinute(data.reminderTime % 60);
        setRemind(true);
      } else {
        setReminderHour(0);
        setReminderMinute(0);
      }
    });
  }, []);

  const logOut = () => {
    setShowModal(false);
    axios
      .post(`${Config.API_URL}/users/currentCourseName`, {
        username: username,
        currentCourseId: currentCourseId,
      })
      .then(() => {
        AsyncStorage.clear();
        navigation.navigate('Start');
      });
  };

  const cancelLogOut = () => {
    setShowModal(false);
  };

  const newCourseNotiHandler = () => {
    // ??ang subscribe -> H???y subcribe
    if (isNewCourseNoti) {
      unsubscribeFromTopic('new-course');
      Toast.show({
        type: 'successToast',
        text1: 'H???y nh???n th??ng b??o th??nh c??ng!',
        visibilityTime: 2000,
      });
    } else {
      subscribeToTopic('new-course');
      Toast.show({
        type: 'successToast',
        text1: '????ng k?? nh???n th??ng b??o th??nh c??ng!',
        visibilityTime: 2000,
      });
    }

    const newState = !isNewCourseNoti;
    setNotiNewCourse(newState);

    axios
      .post(`${Config.API_URL}/users/update`, {
        isNewCourseNoti: newState,
        username: username,
      })
      .then(() => {
        AsyncStorage.mergeItem(
          'user',
          JSON.stringify({
            isNewCourseNoti: newState,
          })
        );
      });
  };

  const newChapterNotiHandler = () => {
    if (isNewChapterNoti) {
      unsubscribeFromTopic('new-chapter');
      Toast.show({
        type: 'successToast',
        text1: 'H???y nh???n th??ng b??o th??nh c??ng!',
        visibilityTime: 2000,
      });
    } else {
      subscribeToTopic('new-chapter');
      Toast.show({
        type: 'successToast',
        text1: '????ng k?? nh???n th??ng b??o th??nh c??ng!',
        visibilityTime: 2000,
      });
    }

    const newState = !isNewChapterNoti;

    axios
      .post(`${Config.API_URL}/users/update`, {
        isNewChapterNoti: newState,
        username: username,
      })
      .then(() => {
        AsyncStorage.mergeItem(
          'user',
          JSON.stringify({
            isNewChapterNoti: newState,
          })
        );
        setNotiNewChapter(newState);
      });
  };

  const onChangeTimePicker = (event, selectedDate) => {
    const currentDate = selectedDate || myDate;
    setMyDate(currentDate);
    setShowDateTimePicker(false);
    const tempDate = new Date(selectedDate);
    const tempHour = tempDate.getHours();
    const tempMinute = tempDate.getMinutes();

    setReminderHour(tempHour);
    setReminderMinute(tempMinute);

    // Call actions from server
    axios.post(`${Config.API_URL}/notification/reminder`, {
      topic: 'reminder',
      minute: tempMinute,
      hour: tempHour,
      username: username,
    });

    AsyncStorage.mergeItem('user', JSON.stringify({ reminderTime: tempMinute + tempHour * 60 }));
    Toast.show({
      type: 'successToast',
      text1: 'C??i ?????t nh???c nh??? th??nh c??ng!',
      visibilityTime: 2000,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Modal */}
      {showModal ? (
        <ConfirmModal
          showModal={showModal}
          negativeFunc={logOut}
          cancelFunc={cancelLogOut}
          positiveFunc={cancelLogOut}
          header="????ng xu???t"
          message="B???n c?? ch???c ch???n mu???n ????ng xu???t kh???i thi???t b??? n??y?"
          negativeMessage="?????ng ??"
          positiveMessage="??? l???i"
        />
      ) : null}
      {/* T??i kho???n */}
      <View style={styles.item}>
        <Text style={styles.title}>T??I KHO???N</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Ch???nh s???a th??ng tin c?? nh??n</Text>
            <FontAwesome5
              size={24}
              color="#14D39A"
              name="pencil-alt"
              onPress={() => navigation.navigate('Ch???nh s???a t??i kho???n')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Ch???nh s???a m???t kh???u</Text>
            <FontAwesome5
              size={24}
              color="#14D39A"
              name="pencil-alt"
              onPress={() => navigation.navigate('Ch???nh s???a m???t kh???u')}
            />
          </View>
        </View>
      </View>
      {/* Nh???c nh??? */}
      <View style={styles.item}>
        <Text style={styles.title}>Nh???c nh???</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>B???t nh???c nh???</Text>
            {isRemind ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={() => {
                  setRemind(!isRemind);
                  unsubscribeFromTopic('reminder');
                  axios.post(`${Config.API_URL}/users/update`, {
                    username: username,
                    reminderTime: null,
                  });
                  AsyncStorage.mergeItem('user', JSON.stringify({ reminderTime: null }));
                  setReminderHour(0);
                  setReminderMinute(0);
                  Toast.show({
                    type: 'successToast',
                    text1: 'H???y nh???n th??ng b??o th??nh c??ng!',
                    visibilityTime: 2000,
                  });
                }}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={() => {
                  setRemind(!isRemind);
                  subscribeToTopic('reminder');
                }}
              />
            )}
          </View>

          <TouchableOpacity onPress={() => setShowDateTimePicker(true)} disabled={!isRemind}>
            <View style={styles.row}>
              <Text style={[styles.text, isRemind ? { color: 'white' } : { color: '#999' }]}>
                Th???i gian
              </Text>
              <Text style={[styles.text, isRemind ? { color: 'white' } : { color: '#999' }]}>
                {reminderHour.toString().length === 2 ? reminderHour : '0' + reminderHour}:
                {reminderMinute.toString().length === 2 ? reminderMinute : '0' + reminderMinute}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Th??ng b??o */}
      <View style={styles.item}>
        <Text style={styles.title}>Th??ng b??o</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Nh???n th??ng b??o khi c?? kh??a h???c m???i</Text>
            </View>

            {isNewCourseNoti ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={newCourseNotiHandler}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={newCourseNotiHandler}
              />
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Nh???n th??ng b??o khi c?? ch????ng m???i</Text>
            </View>

            {isNewChapterNoti ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={newChapterNotiHandler}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={newChapterNotiHandler}
              />
            )}
          </View>
        </View>
      </View>
      {/* Th??ng tin*/}
      <View style={styles.item}>
        <Text style={styles.title}>Th??ng tin</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Phi??n b???n</Text>
            </View>
            <Text style={styles.text}>2022.03.30</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Ph??t tri???n b???i</Text>
            </View>
            <Text style={styles.text}>?????ng b???ng r???ng r??i</Text>
          </View>
        </View>
      </View>
      {/* ????ng xu???t*/}
      <View style={styles.item}>
        <Text style={styles.title}>????ng xu???t</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>????ng xu???t</Text>
            <MaterialIcons
              size={24}
              color="#E46B6B"
              name="logout"
              onPress={() => setShowModal(true)}
            />
          </View>
        </View>
      </View>
      {/* Reminder time Picker */}
      {showDateTimePicker ? (
        <DateTimePicker
          mode="time"
          testID="dateTimePicker"
          value={myDate}
          is24Hour={true}
          display="default"
          onChange={onChangeTimePicker}
        />
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D67FF',
    height: '100%',
    textAlign: 'center',
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
    marginBottom: 30,
  },
  item: {
    marginTop: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 20,
    marginBottom: 10,
  },
  content: {
    backgroundColor: '#2662BB',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 6,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  textLeft: {
    maxWidth: '90%',
  },
});
export default Setting;
