import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';

import {
  setCurrentCourseName,
  setCurrentCourseId,
  setUsername,
  setName,
  setProfilePhotoPath,
  setTotalExp,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../utils/Input';
import CustomButton from '../../utils/CustomButton';

function LogIn({ navigation }) {
  const [username, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const dispatch = useDispatch();

  const submit = () => {
    setOnSubmit(true);
    if (username && password) {
      axios.post(`${Config.API_URL}/users/login`, { username, password }).then((res) => {
        if (res.data.error) {
          Toast.show({
            type: 'errorToast',
            text1: res.data.error,
            visibilityTime: 2000,
          });
          //   setErrorText(true);
        } else {
          Toast.show({
            type: 'successToast',
            text1: 'Đăng nhập thành công',
            visibilityTime: 2000,
          });

          dispatch(setCurrentCourseName(res.data.current_course_name));
          dispatch(setCurrentCourseId(res.data.current_course_id));
          dispatch(setUsername(username));
          dispatch(setName(res.data.name));
          dispatch(setProfilePhotoPath(res.data.profile_photo_path));
          dispatch(setTotalExp(res.data.total_exp));

          // Save to Async Storage
          AsyncStorage.setItem(
            'user',
            JSON.stringify({
              username: username,
              name: res.data.name,
              role: res.data.role_id,
              currentCourseName: res.data.current_course_name,
              currentCourseId: res.data.current_course_id,
              profilePhotoPath: res.data.profile_photo_path,
              totalExp: res.data.tota_exp,
              isNewCourseNoti: res.data.is_new_course_noti,
              isNewChapterNoti: res.data.is_new_chapter_noti,
              reminderTime: res.data.reminder_time,
            })
          ).then(() => {
            navigation.navigate('Home');
          });
        }
      });
    } else {
      Toast.show({
        type: 'errorToast',
        text1: 'Bạn chưa điền đầy đủ thông tin',
        visibilityTime: 2000,
      });
    }
  };
  return (
    <View style={styles.body}>
      <ScrollView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.text}>Đăng nhập</Text>
        <View style={styles.container}>
          <Input
            title="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            value={username}
            error={(onSubmit && username === '') || errorText}
            icon="user"
            onChangeText={(value) => {
              setInputUsername(value);
              setErrorText(false);
            }}
          />
          <Input
            title="Mật khẩu"
            placeholder="Mật khẩu"
            value={password}
            secureTextEntry
            error={onSubmit && password === ''}
            icon="lock"
            onChangeText={(value) => setPassword(value)}
          />
          <View style={styles.LogIn}>
            <CustomButton
              buttonStyles={{ backgroundColor: '#000000', width: 300, height: 60, marginTop: 20 }}
              textStyles={{ color: 'white' }}
              text={'Đăng nhập'}
              onPressFunc={submit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3D67FF',
    flex: 1,
  },
  back: {
    marginLeft: 20,
    marginTop: Dimensions.get('window').height * 0.1,
  },
  text: {
    fontSize: 36,
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: Dimensions.get('window').height * 0.15,
    fontWeight: '500',
  },
  container: {
    // marginTop: Dimensions.get('window').height * 0.05,
  },
  LogIn: {
    marginTop: Dimensions.get('window').height * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default LogIn;
