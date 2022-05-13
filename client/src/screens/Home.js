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

export default function Home({ navigation, route }) {
  const { currentCourseName, currentCourseId, username } = useSelector(
    (state) => state.taskReducer
  );

  const [currentProgress, setCurrentProgress] = useState({});
  const [dataExp, setDataExp] = useState([]);

  useEffect(() => {
    // Lấy thông tin về khóa học hiện tại mà người dùng theo học
    axios
      .post(`${Config.API_URL}/course_user`, {
        username: username,
        courseId: currentCourseId,
      })
      .then((res) => {
        const course = res.data;
        const temp = {
          currentExp: course.total_exp,
          currentChapter: course.current_chapter,
          questionAllCount: course.question_all_count,
          questionLearntCount: course.question_learnt_count,
          isDone: course.isDone,
        };

        setCurrentProgress(temp);
      });

    // Lấy thông tin về exp của tất cả mọi người tham gia khóa học
    axios.get(`${Config.API_URL}/course_user/courseId/${currentCourseId}`).then((res) => {
      let temp = res.data.map((user) => {
        return {
          url: user.User.profile_photo_path,
          exp: user.total_exp,
          userName: user.username,
          name: user.User.name,
        };
      });
      setDataExp(temp);
    });
  }, [currentCourseName, username]);

  // sau chỗ này các bạn lấy data thì thay tên khóa học vào đây
  const userIconHandler = () => {
    navigation.navigate('Tài khoản');
  };

  const barsIconHandler = () => {
    navigation.navigate('ListCourses');
  };

  const header = {
    title: currentCourseName,
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
      <Tab.Screen name="Overview" options={header}>
        {(props) => <Overview {...props} currentProgress={currentProgress} dataExp={dataExp} />}
      </Tab.Screen>
      <Tab.Screen name="Study" component={Study} options={header} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
