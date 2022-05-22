import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourseName, setUsername } from '../redux/actions';

function SettingAdmin({ navigation }) {
  const { currentCourseName, currentCourseId, username } = useSelector(
    (state) => state.taskReducer
  );
  const dispatch = useDispatch();

  const [isRemind, setRemind] = useState(false);
  const [isNotiNewCourse, setNotiNewCourse] = useState(false);
  const [isNotiUpdate, setNotiUpdate] = useState(false);
  useEffect(() => {}, []);

  /// To-do
  /**
   * 1. Lưu các biến boolean ở trên vào Async Storage.
   * 2. Xử lý khi toggle ở nhắc nhở được mở hay tắt -> hiển thị thời gian và ngày cho phù hợp.
   * 3. xử lý khi nhấn vào nút đăng xuất.
   */

  const [showBox, setShowBox] = useState(false);

  const showConfirmDialog = () => {
    setShowBox(true);
    return Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất khỏi thiết bị này', [
      {
        text: 'Chắc chắn',
        style: 'cancel',
        onPress: () => {
          logOut();
          setShowBox(false);
        },
      },
      {
        text: 'Mình vẫn ở lại',
        onPress: () => {
          setShowBox(false);
        },
      },
    ]);
  };

  const logOut = () => {
    axios
      .post(`${Config.API_URL}/users/currentCourseName`, {
        username: username,
        currentCourseName: currentCourseName,
        currentCourseId: currentCourseId,
      })
      .then(() => {
        // dispatch(setCurrentCourseName(''));
        // dispatch(setUsername(''));
        AsyncStorage.clear();
        navigation.navigate('Start');
      });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Modal */}
      {showBox}

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
              onPress={() => showConfirmDialog()}
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
export default SettingAdmin;
