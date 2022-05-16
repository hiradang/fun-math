import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Tutorial from './Study/Tutorial';
import MultipleChoice from './Study/MultipleChoice';

function Lesson({ navigation, route }) {
  const [listQuestion, setListQuestion] = useState([]);
  const [score, setScore] = useState(0);
  const [typeQuestion, setTypeQuestion] = useState(null);
  const chapter_id = route.params.chapter_id;
  const [indexQuestion, setIndexQuestion] = useState(0);
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

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <FontAwesome
          name="close"
          size={30}
          style={{ marginLeft: 10 }}
          color="black"
          onPress={exit}
        />
        <View style={styles.score}>
          <Text style={styles.textScore}>{score}</Text>
        </View>
      </View>
      {typeQuestion === 0 && (
        <Tutorial
          question_id={listQuestion[indexQuestion].question_id}
          changeTypeQuestion={() => setTypeQuestion(1)}
        />
      )}
      {typeQuestion === 1 && (
        <MultipleChoice
          question_id={listQuestion[indexQuestion].question_id}
          changeScore={() => setScore(score + 10)}
          changeType2Question={() => {
            setTypeQuestion(0);
            if (indexQuestion + 1 === listQuestion.length) navigation.navigate('Study');
            else setIndexQuestion(indexQuestion + 1);
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 3,
    justifyContent: 'space-between',
  },
  score: {
    borderRadius: 50,
    width: '25%',
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 2,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textScore: {
    color: 'black',
    fontSize: 20,
    // fontWeight: 40
  },
});
export default Lesson;
