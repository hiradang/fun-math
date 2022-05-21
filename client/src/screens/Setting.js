import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {
  subscribeToTopic,
  unsubscribeFromTopic,
  setBackgroundMessageHandler,
} from '../utils/RNFireBaseNotification';
import Config from 'react-native-config';
import ConfirmModal from '../utils/ConfirmModal';

function Setting({ navigation }) {
  const { currentCourseId, username } = useSelector((state) => state.taskReducer);

  const [isRemind, setRemind] = useState(false);
  const [isNewCourseNoti, setNotiNewCourse] = useState();
  const [isNewChapterNoti, setNotiNewChapter] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      const data = JSON.parse(user);
      setNotiNewCourse(data.isNewCourseNoti);
      setNotiNewChapter(data.isNewChapterNoti);
    });

    setBackgroundMessageHandler();
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

  const newCourseNoti = () => {
    // Đang subscribe -> Hủy subcribe
    if (isNewCourseNoti) {
      unsubscribeFromTopic('new-course');
      Toast.show({
        type: 'successToast',
        text1: 'Hủy nhận thông báo thành công!',
        visibilityTime: 2000,
      });
    } else {
      subscribeToTopic('new-course');
      Toast.show({
        type: 'successToast',
        text1: 'Đăng ký nhận thông báo thành công!',
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

  const newChapterNoti = () => {
    if (isNewChapterNoti) {
      unsubscribeFromTopic('new-chapter');
      Toast.show({
        type: 'successToast',
        text1: 'Hủy nhận thông báo thành công!',
        visibilityTime: 2000,
      });
    } else {
      subscribeToTopic('new-chapter');
      Toast.show({
        type: 'successToast',
        text1: 'Đăng ký nhận thông báo thành công!',
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

  return (
    <ScrollView style={styles.container}>
      {/* Modal */}
      {showModal ? (
        <ConfirmModal
          showModal={showModal}
          negativeFunc={logOut}
          cancelFunc={cancelLogOut}
          positiveFunc={cancelLogOut}
          header="Đăng xuất"
          message="Bạn có chắc chắn muốn đăng xuất khỏi thiết bị này?"
          negativeMessage="Đồng ý"
          positiveMessage="Ở lại"
        />
      ) : null}

      {/* Tài khoản */}
      <View style={styles.item}>
        <Text style={styles.title}>TÀI KHOẢN</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Chỉnh sửa profile</Text>
            <FontAwesome5
              size={24}
              color="#14D39A"
              name="pencil-alt"
              onPress={() => navigation.navigate('Chỉnh sửa tài khoản')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Chỉnh sửa mật khẩu</Text>
            <FontAwesome5
              size={24}
              color="#14D39A"
              name="pencil-alt"
              onPress={() => navigation.navigate('Chỉnh sửa mật khẩu')}
            />
          </View>
        </View>
      </View>

      {/* Nhắc nhở */}
      <View style={styles.item}>
        <Text style={styles.title}>Nhắc nhở</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Bật nhắc nhở</Text>
            {isRemind ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={() => setRemind(!isRemind)}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={() => setRemind(!isRemind)}
              />
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Thời gian</Text>
            <Text style={styles.text}>20:00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Ngày</Text>
            <Text style={styles.text}>T2 - T6</Text>
          </View>
        </View>
      </View>

      {/* Thông báo */}
      <View style={styles.item}>
        <Text style={styles.title}>Thông báo</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Nhận thông báo khi có khóa học mới</Text>
            </View>

            {isNewCourseNoti ? (
              <FontAwesome5 size={24} color="#14D39A" name="toggle-on" onPress={newCourseNoti} />
            ) : (
              <FontAwesome5 size={24} color="#ccc" name="toggle-off" onPress={newCourseNoti} />
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Nhận thông báo khi có chương mới</Text>
            </View>

            {isNewChapterNoti ? (
              <FontAwesome5 size={24} color="#14D39A" name="toggle-on" onPress={newChapterNoti} />
            ) : (
              <FontAwesome5 size={24} color="#ccc" name="toggle-off" onPress={newChapterNoti} />
            )}
          </View>
        </View>
      </View>

      {/* Thông tin*/}
      <View style={styles.item}>
        <Text style={styles.title}>Thông tin</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Phiên bản</Text>
            </View>
            <Text style={styles.text}>2022.03.30</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Phát triển bởi</Text>
            </View>
            <Text style={styles.text}>Đồng bằng rộng rãi</Text>
          </View>
        </View>
      </View>

      {/* Đăng xuất*/}
      <View style={styles.item}>
        <Text style={styles.title}>Đăng xuất</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Đăng xuất</Text>
            <MaterialIcons
              size={24}
              color="#E46B6B"
              name="logout"
              onPress={() => setShowModal(true)}
              // onPress={() => console.log('Pressed!')}
            />
          </View>
        </View>
      </View>
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
    fontSize: 16,
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
    fontSize: 14,
  },
  textLeft: {
    maxWidth: '90%',
  },
});
export default Setting;
