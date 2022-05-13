import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourseName, setCurrentCourseId } from '../redux/actions';

import axios from 'axios';

export default function ListCourses({ navigation, route }) {
  const { currentCourseName, username } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  const [selCourse, setSelCourse] = useState({});
  const [notAllowSelCourses, setNotAllowSelCourses] = useState([]);

  useEffect(() => {
    axios.get(`${Config.API_URL}/course_user/${username}`).then((res) => {
      // Set selCourse
      let tempSelCourse = res.data.find((obj) => obj.course_name === currentCourseName);
      setSelCourse(tempSelCourse);

      // Set notAllowSelCourses
      let tempNotAllowSelCourses = res.data.filter((obj) => obj.course_name !== currentCourseName);
      setNotAllowSelCourses(tempNotAllowSelCourses);
    });
  }, []);

  const renderCourse = (course) => {
    return (
      <TouchableOpacity
        style={styles.course}
        key={course.course_id}
        onPress={() => {
          dispatch(setCurrentCourseName(course.course_name));
          dispatch(setCurrentCourseId(course.course_id));
          AsyncStorage.mergeItem(
            'user',
            JSON.stringify({
              currentCourseName: course.course_name,
              currentCourseId: course.course_id,
            }),
            () => {
              navigation.navigate('Home');
            }
          );
        }}
      >
        <View style={styles.courseIconWrapper}>
          {course.course_name === 'Phép cộng' && <Octicons name="plus" size={35} color="black" />}
          {course.course_name === 'Phép nhân' && <Octicons name="x" size={35} color="black" />}
          {course.course_name === 'Phép trừ' && <Octicons name="dash" size={35} color="black" />}
          {course.course_name === 'Phép chia' && (
            <MaterialCommunityIcons name="division" size={35} color="black" />
          )}
        </View>
        <View style={styles.nameAndProgress}>
          <Text style={styles.nameCourse} numberOfLines={1}>
            {course.course_name}
          </Text>
          {course.is_done && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Đã hoàn thành
            </Text>
          )}
          {!course.is_done && course.total_exp > 0 && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Chương {course.current_chapter}: {course.question_learnt_count}/
              {course.question_all_count}
            </Text>
          )}
          {!course.is_done && course.total_exp === 0 && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Chưa bắt đầu
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedCourseTitle}>KHÓA HỌC ĐÃ CHỌN</Text>
      {renderCourse(selCourse)}
      <Text style={styles.selectedCourseTitle}>NHỮNG KHÓA HỌC KHÁC</Text>
      {notAllowSelCourses.map((obj) => renderCourse(obj))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  selectedCourseTitle: {
    fontSize: 20,
    color: '#CBD6FF',
    fontWeight: '600',
  },
  course: {
    flex: 0.18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIconWrapper: {
    height: 60,
    width: 60,
    borderRadius: 30,

    backgroundColor: '#9FE0E0',
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#545B5B',
    borderWidth: 2,

    marginRight: 20,
  },
  nameAndProgress: {},
  nameCourse: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 8,
  },
  progressCourse: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
