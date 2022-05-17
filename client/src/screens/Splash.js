import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCourseName,
  setCurrentCourseId,
  setUsername,
  setName,
  setProfilePhotoPath,
  setTotalExp,
} from '../redux/actions';

function Splash({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then((user) => {
        if (!JSON.parse(user)) navigation.replace('Start');
        else {
          const data = JSON.parse(user);
          dispatch(setCurrentCourseName(data.currentCourseName));
          dispatch(setCurrentCourseId(data.currentCourseId));
          dispatch(setUsername(data.username));
          dispatch(setName(data.name));
          dispatch(setProfilePhotoPath(data.profilePhotoPath));
          dispatch(setTotalExp(data.totalExp));
          navigation.replace('Home');
        }
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
