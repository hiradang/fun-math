import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

import LessonForm from './LessonForm';

const { width, height } = Dimensions.get('window');

export default function EditLesson({ navigation, route }) {
  const { courseName, chapterName, question_id } = route.params;
  const [data, setData] = useState();

  const uploadImageFirebase = async (image, multiChoice) => {
    // save the image as username
    let filename = 'question' + multiChoice + image.substring(image.lastIndexOf('/') + 1);
    // let filename = image.substring(image.lastIndexOf('/') + 1);

    try {
      await Storage().ref(filename).putFile(image);
    } catch (e) {
      console.log(e);
    }
  };

  // ở kia n submit cái gì thì ở đây lấy cái đó. Nma vẫn thiếu ảnh nha :v
  const editNewLesson = (questionName, multiChoice, fillBox, isNewImage, isNewImageMulti) => {
    // Thêm thành công r bắn ra 1 cái thông báo
    // Xong cho n goBack()
    let urlImage = questionName.question_image;
    let urlImageMulti = multiChoice.question_image;
    if (isNewImage) {
      uploadImageFirebase(questionName.question_image, '').then(() => {
        Storage()
          .ref('question' + questionName.question_image)
          .getDownloadURL()
          .then((url) => {
            urlImage = url;
          });
      });
      RNFS.exists(questionName.question_image).then((exists) => {
        if (exists) {
          RNFS.unlink(questionName.question_image);
        }
      });
    }
    if (isNewImageMulti) {
      uploadImageFirebase(multiChoice.question_image, 'multi').then(() => {
        Storage()
          .ref('question' + 'multi' + multiChoice.question_image)
          .getDownloadURL()
          .then((url) => {
            urlImageMulti = url;
          });
      });
      RNFS.exists(multiChoice.question_image).then((exists) => {
        if (exists) {
          RNFS.unlink(multiChoice.question_image);
        }
      });
    }
    axios
      .post(`${Config.API_URL}/questions/${question_id}`, {
        questionName: { ...questionName, question_image: urlImage },
        multiChoice: { ...multiChoice, question_image: urlImageMulti },
        fillBox,
      })
      .then((res) => {
        // setListCourse(res.data);
        if (res.data.error) {
          Toast.show({
            type: 'errorToast',
            text1: res.data.error,
            visibilityTime: 2000,
          });
        } else {
          Toast.show({
            type: 'successToast',
            text1: 'Sửa bài học thành công',
            visibilityTime: 2000,
          });
          navigation.goBack();
        }
      });
    // Delete image in Android/emulator
  };

  useEffect(() => {
    if (question_id) {
      axios.get(`${Config.API_URL}/questions/all/${question_id}`).then((res) => {
        setData(res.data);
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
