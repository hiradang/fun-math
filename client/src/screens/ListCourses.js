import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// division: Phép chia
// x: phép nhân
// plus: phép cộng
// dash: phép trừ

export default function ListCourses({ navigation, route }) {
  const { currentCourse } = route.params;

  // gọi API về thông tin tất cả khóa học của người dùng
  const listCourse = [
    {
      name: 'Phép cộng',
      currentExp: 10,
      currentChapter: 10,
      currentLesson: 20,
      totalLesson: 50,
      isDone: false,
    },
    {
      name: 'Phép trừ',
      currentExp: 0,
      currentChapter: 0,
      currentLesson: 0,
      totalLesson: 0,
      isDone: false,
    },
    {
      name: 'Phép nhân',
      currentExp: 10,
      currentChapter: 10,
      currentLesson: 20,
      totalLesson: 50,
      isDone: true,
    },
    {
      name: 'Phép chia',
      currentExp: 10,
      currentChapter: 10,
      currentLesson: 20,
      totalLesson: 50,
      isDone: false,
    },
  ];

  const selCourse = listCourse.find((obj) => obj.name === currentCourse);

  const notAllowSelCourse = listCourse.filter((obj) => obj.name !== currentCourse);

  const renderCourse = (course) => {
    return (
      <TouchableOpacity
        style={styles.course}
        key={course.name}
        onPress={() => navigation.navigate('Home', { newCourse: course.name })}
      >
        <View style={styles.courseIconWrapper}>
          {/* <Image style={styles.avatarImg} source={{ uri: data.url }} /> */}
          {course.name === 'Phép cộng' && <Octicons name="plus" size={35} color="black" />}
          {course.name === 'Phép nhân' && <Octicons name="x" size={35} color="black" />}
          {course.name === 'Phép trừ' && <Octicons name="dash" size={35} color="black" />}
          {course.name === 'Phép chia' && (
            <MaterialCommunityIcons name="division" size={35} color="black" />
          )}
        </View>
        <View style={styles.nameAndProgress}>
          <Text style={styles.nameCourse} numberOfLines={1}>
            {course.name}
          </Text>
          {course.isDone && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Đã hoàn thành
            </Text>
          )}
          {!course.isDone && course.currentExp > 0 && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Chương {course.currentChapter}: {course.currentLesson}/{course.totalLesson}
            </Text>
          )}
          {!course.isDone && course.currentExp === 0 && (
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
      {notAllowSelCourse.map((obj) => renderCourse(obj))}
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
