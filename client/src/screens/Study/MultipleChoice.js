import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

import CustomButton from '../../utils/CustomButton';
import Card from './Card';
import NumberBox from './NumberBox';
import SignBox from './SignBox';
const { width, height } = Dimensions.get('window');

function MultipleChoice(props) {
  const [idSelect, setIdSelect] = useState(null);
  const [data, setData] = useState(null);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const convertDataHandle = (format_question) => {
    const notNumber = ['+', '-', 'x', ':', '=', '?'];
    const myArray = format_question.split('');
    const length = myArray.length;
    const target = [];

    for (let i = 0; i <= length - 1; i++) {
      if (notNumber.includes(myArray[i])) {
        target.push(myArray[i]);
      } else {
        let number = myArray[i];
        const start = i + 1;
        for (let x = start; x <= length - 1; x++) {
          if (!notNumber.includes(myArray[x])) number += myArray[x];
          else {
            i = x - 1;
            break;
          }
        }
        target.push(number);
      }
    }

    return target;
  };
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
    if (idSelect === null) {
      Toast.show({
        type: 'disableToast',
        text1: 'Bạn chưa chọn đáp án',
        visibilityTime: 2000,
      });
    } else if (!checkAnswer) {
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
        <Image
          source={{ uri: urlImage }}
          style={{ width: width, height: height * 0.28 }}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={styles.question}>
        {data &&
          data.format_question.map((value, i) => {
            if (i % 2 === 0) return <NumberBox key={i} text={value !== '?' && value} />;
            else return <SignBox key={i} item={value} />;
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
      {data && (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <CustomButton
            textStyles={{ color: 'white' }}
            buttonStyles={idSelect !== null ? styles.buttonStyles : styles.buttonStylesDisabled}
            text={checkAnswer ? 'Tiếp tục' : 'Trả lời'}
            onPressFunc={nextQuestion}
          />
        </View>
      )}
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
    display: 'flex',
    justifyContent: 'center',

    width: '100%',
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: '#2662BB',
  },
  container: {
    marginBottom: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  image: {},
  question: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: width * 0.8,
    marginHorizontal: width * 0.1,
    marginVertical: width * 0.08,
  },
  button: {
    backgroundColor: 'black',
    width: 200,
    height: 60,
  },
  buttonStyles: {
    backgroundColor: 'black',
    width: 200,
    height: 60,
  },
  buttonStylesDisabled: {
    backgroundColor: '#C4C4C4',
    width: 200,
    height: 60,
  },
});
export default MultipleChoice;
