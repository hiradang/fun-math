import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Input from '../../utils/Input';
import CustomButton from '../../utils/CustomButton';

function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [onSubmit, setOnSubmit] = useState(false)
  // useEffect(() => {
  //   axios.get(`${Config.API_URL}/courses`).then((res) => {
  //     setCourses(res.data);
  //   });
  // }, []);

  const submit = () => {
    console.log(username, name, password, checkPass)
    setOnSubmit(true)
  }
  return (
    <View style={styles.body}>
      <ScrollView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome5 name={'angle-left'} size={25} color={'#ffffff'} />
        </TouchableOpacity>
        <Text style={styles.text}>Đăng ký</Text>
        <Input
          title="Tên đăng nhập"
          placeholder="Tên đăng nhập"
          value={username}
          error = {onSubmit && username === ''}
          icon="user"
          onChangeText={(value) => setUsername(value)}
        />
        <Input
          title="Tên người dùng"
          placeholder="Tên người dùng"
          value={name}
          icon="user"
          error = {onSubmit && name === ''}
          onChangeText={(value) => setName(value)}
        />
        <Input
          title="Mật khẩu"
          placeholder="Mật khẩu"
          value={password}
          secureTextEntry
          error = {onSubmit && password === ''}
          icon="lock"
          onChangeText={(value) => setPassword(value)}
        />
        <Input
          title="Xác nhận mật khẩu"
          placeholder="Mật khẩu"
          value={checkPass}
          error = {onSubmit && checkPass === ''}
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
            onPressFunction = {submit}
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
    marginTop: 50,
  },
  text: {
    fontSize: 36,
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 60,
    fontWeight: '500',
  },
  signup: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default SignUp;
