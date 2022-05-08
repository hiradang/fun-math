import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Input from '../../utils/Input';
import CustomButton from '../../utils/CustomButton';

function LogIn({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorText, setErrorText] = useState(false);
  // useEffect(() => {
  //   axios.get(`${Config.API_URL}/courses`).then((res) => {
  //     setCourses(res.data);
  //   });
  // }, []);

  const submit = () => {
    setOnSubmit(true);
    if (username && password) {
      axios.post(`${Config.API_URL}/users/login`, { username, password }).then((res) => {
        if (res.data.error) {
          Toast.show({
            type: 'error',
            text1: res.data.error,
            visibilityTime: 2000,
          });
          //   setErrorText(true);
        } else {
          Toast.show({
            type: 'success',
            text1: 'Đăng nhập thành công',
            visibilityTime: 2000,
          });
          AsyncStorage.setItem(
            'user',
            JSON.stringify({ username: username, name: res.data.name, role: res.data.role_id })
          ).then(() => {
            navigation.navigate('Test');
          });
        }
      });
    } else {
      Toast.show({
        type: 'error',
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
              setUsername(value);
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
              color={'#000000'}
              title={'Đăng nhập'}
              colorText={'#ffffff'}
              width={300}
              onPressFunction={submit}
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
    marginTop: '10%',
  },
  text: {
    fontSize: 36,
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: '10%',
    fontWeight: '500',
  },
  container: {
    marginTop: '15%',
  },
  LogIn: {
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default LogIn;
