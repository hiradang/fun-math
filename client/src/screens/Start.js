import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../utils/CustomButton';

function Start({navigation}) {
  return (
    <View style={styles.body}>
      <View style={styles.main}>
        <Image style={styles.image} source={require('../../assets/logo.png')}></Image>
        <Text style={styles.text}>FunMath</Text>
      </View>
      <View style={styles.button}>
        <CustomButton
          color={'#ffffff'}
          title={'Đăng ký'}
          colorText={'#000000'}
          style={styles.signup}
          width = {160}
          onPressFunction={() => navigation.navigate('Signup')}
        />
        <CustomButton
          color={'#000000'}
          title={'Đăng nhập'}
          colorText={'#ffffff'}
          width = {160}
          onPressFunction={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3D67FF',
    flex: 1,
  },
  main: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 50,
    color: '#ffffff',
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Start;
