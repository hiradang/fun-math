import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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
              type: 'errorToast',
              text1: res.data.error,
              visibilityTime: 2000,
            });
            setErrorText(true);
          } else {
            Toast.show({
              type: 'successToast',
              text1: 'Đăng ký thành công',
              visibilityTime: 2000,
            });
            navigation.navigate('Login');
          }
        });
    } else if (!username || !name || !password || !checkPass) {
      Toast.show({
        type: 'errorToast',
        text1: 'Bạn chưa điền đầy đủ thông tin',
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: 'errorToast',
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
            navigation.goBack();
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
            buttonStyles={{ backgroundColor: '#000000', width: '60%', height: 60, marginTop: 20 }}
            textStyles={{ color: 'white' }}
            text={'Đăng ký'}
            onPressFunc={submit}
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
    marginTop: Dimensions.get('window').height * 0.05,
  },
  text: {
    fontSize: 36,
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: Dimensions.get('window').height * 0.05,
    fontWeight: '500',
  },
  signup: {
    marginTop: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default SignUp;
