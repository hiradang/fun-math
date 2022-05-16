import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Config from 'react-native-config';

import CustomButton from '../../utils/CustomButton';
import Card from './Card';
import NumberBox from './NumberBox';
import SignBox from './SignInBox';

function MultipleChoice(props) {
  const [idSelect, setIdSelect] = useState(null);
  const [data, setData] = useState(null);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  useEffect(() => {
    axios.get(`${Config.API_URL}/multiQuestions/${props.question_id}`).then((res) => {
      setData({
        correct_answer: res.data[0].correct_answer,
        answers: JSON.parse('[' + res.data[0].answers + ']'),
        question: res.data[0].question,
        format_question: convertDataHandle(res.data[0].format_question),
      });
    });

    axios.get(`${Config.API_URL}/multiQuestions/image/${props.question_id}`).then((res) => {
      setUrlImage(res.data.question_image);
    });
  }, []);

  const nextQuestion = () => {
    if (!checkAnswer) {
      setCheckAnswer(true);
      if (correct) props.changeScore();
    } else props.changeType2Question();
  };
  return (
    <View style={styles.body}>
      <View style={styles.title}>
        <Text style={styles.text}>{data && data.question}</Text>
      </View>
      <View style={styles.image}>
        <Image uri={urlImage} resizeMode="cover"></Image>
      </View>
      <View style={styles.question}>
        {data &&
          data.format_question.map((value, i) => {
            if (i % 2 === 0) return <NumberBox key={i} text={value !== '?' && value} />;
            else return <SignBox key={i} text={value} />;
          })}
      </View>
      <View style={styles.container}>
        {data &&
          data.answers.map((value, i) => {
            return (
              <Card
                status={(status) => setCorrect(status)}
                correct={value === data.correct_answer}
                checkAnswer={checkAnswer}
                key={i}
                id={i}
                text={value}
                press={i === idSelect}
                select={(idSelect) => setIdSelect(idSelect)}
              />
            );
          })}
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <CustomButton
          buttonStyles={styles.button}
          textStyles={{ color: 'white' }}
          // pos="right"
          // iconName="next"
          disabled={idSelect === null}
          text={checkAnswer ? 'Tiếp tục' : 'Trả lời'}
          onPressFunc={nextQuestion}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    backgroundColor: '#2662BB',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000000',
    width: 200,
    height: 60,
  },
});
export default MultipleChoice;
