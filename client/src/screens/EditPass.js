import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Input from '../utils/Input';
import CustomButton from '../utils/CustomButton';

function EditPass({ navigation }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const submit = () => {
    setOnSubmit(true);
    if ( password && newPassword && newPassword === checkPass) {
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
        
        <Input
          title="Mật khẩu cũ"
          placeholder="Mật khẩu cũ"
          value={password}
          secureTextEntry
          error={onSubmit && password === ''}
          icon="lock"
          onChangeText={(value) => setPassword(value)}
        />
        <Input
          title="Mật khẩu mới"
          placeholder="Mật khẩu mới"
          value={newPassword}
          secureTextEntry
          error={onSubmit && password === ''}
          icon="lock"
          onChangeText={(value) => setNewPassword(value)}
        />
        <Input
          title="Xác nhận mật khẩu mới"
          placeholder="Xác nhận mật khẩu mới"
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
            text={'Xác nhận'}
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
export default EditPass;
