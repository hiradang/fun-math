import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourseName, setUsername } from '../redux/actions';

function Splash({ navigation }) {
  const { currentCourseName, username } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set dữ liệu username và Current Course ban đầu khi mở ứng dụng
    AsyncStorage.getItem('user').then((res) => {
      const data = JSON.parse(res);
      dispatch(setCurrentCourseName(data.currentCourseName));
      dispatch(setUsername(data.username));
    });

    setTimeout(() => {
      AsyncStorage.getItem('user').then((user) => {
        if (!JSON.parse(user)) navigation.replace('Start');
        else navigation.replace('Home');
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.main}>
        <Image style={styles.image} source={require('../../assets/logo.png')}></Image>
        <Text style={styles.text}>FunMath</Text>
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
});
export default Splash;
