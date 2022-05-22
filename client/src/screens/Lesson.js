import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

import Tutorial from './Study/Tutorial';
import MultipleChoice from './Study/MultipleChoice';
import TypeFormat from './Study/TypeFormat';

const { width, height } = Dimensions.get('screen');

function Lesson({ navigation, route }) {
  const [listQuestion, setListQuestion] = useState([]);
  const [score, setScore] = useState(0);
  const [typeQuestion, setTypeQuestion] = useState(null);
  const {chapter_id, isDone} = route.params;
  const [indexQuestion, setIndexQuestion] = useState(0);
  const { username, currentCourseId } = useSelector((state) => state.taskReducer);

  useEffect(() => {
    axios
      .get(`${Config.API_URL}/questions/${chapter_id}`)
      .then((res) => {
        setListQuestion(res.data);
        setTypeQuestion(0);
      })
      .catch((e) => console.log(e));
  }, []);

  const exit = () => {
    Alert.alert(
      'Thoát phiên học',
      'Bạn có chắc muốn thoát tiết học này không? Kết quả học tập sẽ không được lưu lại.',
      [{ text: 'HỦY' }, { text: 'CÓ', onPress: () => navigation.navigate('Study') }]
    );
  };

  const finish = () => {
    axios
      .post(`${Config.API_URL}/course_user/exp`, {
        username,
        chapter_id,
        courseId: currentCourseId,
        exp: score,
        totalLesson: isDone ? 0 : listQuestion.length,
      })
      .then((res) => {
        navigation.navigate('Study');
      });
  };
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <AntDesign
          name="close"
          size={28}
          style={{ marginLeft: 16 }}
          color="black"
          onPress={exit}
        />
        <View style={styles.score}>
          <Text style={styles.textScore}>{score}</Text>
        </View>
      </View>
      {typeQuestion === 0 && (
        <Tutorial
          indexQuestion={indexQuestion}
          totalLesson={listQuestion.length}
          question_id={listQuestion[indexQuestion].question_id}
          changeTypeQuestion={() => setTypeQuestion(1)}
        />
      )}
      {typeQuestion === 1 && (
        <MultipleChoice
          question_id={listQuestion[indexQuestion].question_id}
          changeScore={() => setScore(score + 10)}
          changeType2Question={() => {
            setTypeQuestion(2);
          }}
        />
      )}
      {typeQuestion === 2 && (
        <TypeFormat
          question_id={listQuestion[indexQuestion].question_id}
          changeScore={() => setScore(score + 10)}
          changeType3Question={() => {
            if (indexQuestion + 1 === listQuestion.length) {
              finish();
            } else {
              setTypeQuestion(0);
              setIndexQuestion(indexQuestion + 1);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#3D67FF',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    height: height * 0.07,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 3,
  },
  score: {
    borderRadius: 50,
    width: '24%',
    height: 36,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4E4E4',
  },
  textScore: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
});
export default Lesson;
