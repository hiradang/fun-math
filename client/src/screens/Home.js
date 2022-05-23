import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

import { useSelector } from 'react-redux';

import HeaderStyles from '../utils/HeaderStyles';
import Overview from './Overview';
import Study from './Study';

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const { currentCourseName } = useSelector((state) => state.taskReducer);

  const userIconHandler = () => {
    navigation.navigate('Tài khoản');
  };

  const barsIconHandler = () => {
    navigation.navigate('ListCourses');
  };

  const header = {
    title: currentCourseName ? currentCourseName: '',
    headerRight: () => {
      return (
        <TouchableOpacity onPress={userIconHandler}>
          <FontAwesome name="user" size={30} color="black" />
        </TouchableOpacity>
      );
    },
    headerLeft: () => {
      return (
        <TouchableOpacity onPress={barsIconHandler}>
          <FontAwesome name="bars" size={25} color="black" colorText="white" />
        </TouchableOpacity>
      );
    },
    headerRightContainerStyle: {
      paddingHorizontal: 20,
    },
    headerLeftContainerStyle: {
      paddingHorizontal: 20,
    },
    ...HeaderStyles,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Overview') {
            iconName = 'home';
            size = focused ? 50 : 35;
            color = focused ? '#9A4AFF' : '#DDDDDD';
          } else if (route.name === 'Study') {
            iconName = 'menu-book';
            size = focused ? 45 : 35;
            color = focused ? '#9A4AFF' : '#DDDDDD';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { height: '10%', borderTopColor: '#DDDDDD', borderTopWidth: 3 },
      })}
    >
      <Tab.Screen name="Overview" component={Overview} options={header} />
      <Tab.Screen name="Study" component={Study} options={header} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
