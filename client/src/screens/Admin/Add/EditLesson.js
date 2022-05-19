import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import axios from 'axios';

import LessonForm from './LessonForm';

const { width, height } = Dimensions.get('window');

export default function EditLesson({ navigation, route }) {
  const { courseName, chapterName, question_id } = route.params;
  const [data, setData] = useState()
  // ở kia n submit cái gì thì ở đây lấy cái đó. Nma vẫn thiếu ảnh nha :v
  const editNewLesson = (questionName, multiChoice, fillBox) => {
    // Thêm thành công r bắn ra 1 cái thông báo
    // Xong cho n goBack()
  };

  useEffect(() => {
    if (question_id) {
      axios.get(`${Config.API_URL}/questions/all/${question_id}`).then((res) => {
        setData(res.data)
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {courseName} - {chapterName}
      </Text>
      <Text style={styles.subTitle}>Chỉnh sửa bài học</Text>
      {data && <LessonForm submitCourseFunction={editNewLesson} data={data} />}
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
