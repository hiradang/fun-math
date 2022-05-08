import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../utils/CustomButton';

function Start({ navigation }) {
  return (
    <View style={styles.body}>
      <View style={styles.main}>
        <Image style={styles.image} source={require('../../assets/logo.png')}></Image>
      </View>
      <View style={styles.button}>
        <Text style={styles.text}>
          Chào mừng đến với FunMath. Hãy bắt đầu ngay để khám phá thế giới kỳ diệu của những con số
          nào!
        </Text>
        <CustomButton
          color={'#000000'}
          title={'Đăng ký'}
          colorText={'#ffffff'}
          style={styles.signup}
          width={'60%'}
          onPressFunction={() => navigation.navigate('Signup')}
        />
        <CustomButton
          color={'#000000'}
          title={'Đăng nhập'}
          colorText={'#ffffff'}
          width={'60%'}
          onPressFunction={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  main: {
    flex: 3,
    width: '100%',
    backgroundColor: '#3D67FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 26,
    width: '80%',
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    width: '80%',
    height: '15%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    marginTop: -150,
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default Start;
