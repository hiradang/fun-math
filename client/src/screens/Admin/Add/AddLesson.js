import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import LessonForm from './LessonForm';

const { width, height } = Dimensions.get('window');

export default function AddLesson({ navigation, route }) {
  const { courseName, chapterName, chapterId } = route.params;

  // ở kia n submit cái gì thì ở đây lấy cái đó. Nma vẫn thiếu ảnh nha :v
  const addNewLesson = (questionName, multiChoice, fillBox) => {
    // Thêm thành công r bắn ra 1 cái thông báo
    // Xong cho n goBack()
    axios.post(`${Config.API_URL}/questions`, {questionName, multiChoice, fillBox, chapter_id : chapterId}).then((res) => {
     // setListCourse(res.data);
     Toast.show({
      type: 'successToast',
      text1: 'Thêm bài học thành công',
      visibilityTime: 2000,
    });
     navigation.goBack()
    });
    console.log(questionName, multiChoice, fillBox)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {courseName} - {chapterName}{' '}
      </Text>
      <Text style={styles.subTitle}>Tạo bài học mới</Text>
      <LessonForm submitCourseFunction={addNewLesson} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 22,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',

    marginTop: height * 0.04,
  },
  subTitle: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',

    marginTop: 5,
    marginBottom: height * 0.04,
  },
});
