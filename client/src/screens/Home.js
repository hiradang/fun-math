import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Overview from './Overview';
import Study from './Study';
import HeaderStyles from '../utils/HeaderStyles';

const Tab = createBottomTabNavigator();

export default function Home({ navigation, route }) {
  // sau chỗ này các bạn lấy data thì thay tên khóa học vào đây
  let currentCourse = 'Phép cộng';
  if (typeof route.params?.newCourse !== 'undefined') currentCourse = route.params.newCourse;
  const userIconHandler = () => {
    navigation.navigate('Tài khoản');
  };

  const barsIconHandler = () => {
    navigation.navigate('ListCourses', { currentCourse: currentCourse });
  };

  const header = {
    title: currentCourse,
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
      // tabBarOptions={{
      //   showLabel: false,
      // }}
    >
      <Tab.Screen name="Overview" component={Overview} options={header} />
      <Tab.Screen name="Study" component={Study} options={header} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
