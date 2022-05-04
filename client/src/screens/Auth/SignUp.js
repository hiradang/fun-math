import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Input from '../../utils/Input';
import CustomButton from '../../utils/CustomButton';

function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const submit = () => {
    setOnSubmit(true);
    if (username && name && password && password === checkPass) {
      axios
        .post(`${Config.API_URL}/users`, { username, password, role_id: '0', name: name })
        .then((res) => {
          if (res.data.error) {
            Toast.show({
              type: 'error',
              text1: res.data.error,
              visibilityTime: 2000,
            });
            setErrorText(true);
          } else {
            Toast.show({
              type: 'success',
              text1: 'Đăng ký thành công',
              visibilityTime: 2000,
            });
            navigation.goBack();
          }
        });
    } else if (!username || !name || !password || !checkPass) {
      Toast.show({
        type: 'error',
        text1: 'Bạn chưa điền đầy đủ thông tin',
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu xác nhận không trùng khớp',
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
            navigation.navigate('Login');
          }}
        >
          <Ionicons name="chevron-back" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.text}>Đăng ký</Text>
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
          title="Tên người dùng"
          placeholder="Tên người dùng"
          value={name}
          icon="user"
          error={onSubmit && name === ''}
          onChangeText={(value) => setName(value)}
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
        <Input
          title="Xác nhận mật khẩu"
          placeholder="Mật khẩu"
          value={checkPass}
          error={onSubmit && checkPass === ''}
          secureTextEntry
          icon="lock"
          onChangeText={(value) => setCheckPass(value)}
        />
        <View style={styles.signup}>
          <CustomButton
            color={'#000000'}
            title={'Đăng ký'}
            colorText={'#ffffff'}
            width={300}
            onPressFunction={submit}
          />
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
    marginTop: '5%',
  },
  text: {
    fontSize: 36,
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: '5%',
    fontWeight: '500',
  },
  signup: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default SignUp;
