import { Dimensions, StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Config from 'react-native-config';

import CustomButton from '../../utils/CustomButton';
import NumberInput from '../../utils/NumberInput';
import NumberBox from './NumberBox';
import SignBox from './SignBox';

const { width, height } = Dimensions.get('window');




export default function TypeFormat(props) {
  const [answers, setAnswers] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [result, setResult] = useState('');
  const [question_name, setQuestion_name] = useState();
  const [dataQuestion, setDataQuestion] = useState({
    question: '',
    correct_answer: '',
    format_question: '',
  });

  useEffect(() => {
    axios.get(`${Config.API_URL}/typeQuestions/${props.question_id}`).then((res) => {
      setQuestion_name(res.data.question_name);
      setDataQuestion({
        question: res.data.question,
        correct_answer: res.data.correct_answer,
        format_question: res.data.format_question,
      });
    });
  }, []);

  const correctAnswer = dataQuestion.correct_answer.split(',');
  const lengthCorrectAnswer = correctAnswer.length;

  const checkAnswer = (myArray) => {
    for (let i = 0; i <= lengthCorrectAnswer - 1; i++) {
      if (myArray[i] !== correctAnswer[i]) {
        return false;
      }
    }
    return true;
  };

  const operation = ['+', '-', 'x', ':', '='];

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

  const dataConverted = convertDataHandle(dataQuestion.format_question);

  const onPressButton = () => {
    let userAnswer = answers.filter((answer) => answer.length >= 1);

    if (!buttonDisable) {
      Toast.show({
        type: 'disableToast',
        text1: 'B???n ch??a ho??n th??nh ph??p t??nh',
        visibilityTime: 2000,
      });
    } else {
      if (result) {
        props.changeType3Question();
      } else {
        if (checkAnswer(userAnswer)) {
          setResult('correct');
          start();
          props.changeScore();
        } else {
          setResult('incorrect');
          start();
        }
      }
    }
  };

  const checkFullFilled = () => {
    let userAnswer = answers.filter((answer) => answer.length >= 1);
    let lengthUserAnswer = userAnswer.length;

    if (lengthUserAnswer < lengthCorrectAnswer) return false;
    else return true;
  };

  const onChangeTextInput = (value, idx) => {
    answers[idx] = value;
    setButtonDisable(checkFullFilled());
  };

  const setBackForContainer = () => {
    if (result === 'correct') return '#8DEA85';
    else if (result === 'incorrect') return '#EE6E6E';
    else return '#2662BB';
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const showCorrectAnswer = () => {
    let correct = '';
    let count = 0;
    const length = dataConverted.length;

    for (let i = 0; i <= length - 1; i++) {
      if (operation.includes(dataConverted[i])) correct += dataConverted[i] + ' ';
      else if (dataConverted[i] === '?') {
        correct += correctAnswer[count] + ' ';
        count++;
      } else correct += dataConverted[i] + ' ';
    }

    return correct;
  };

  let indexOfInput = 0;

  return (
    <View style={{ ...styles.container, backgroundColor: setBackForContainer() }}>
      <ScrollView>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{question_name}</Text>
        </View>
        <View style={styles.top}>
          <View style={styles.threadWrapper}>
            <Text style={styles.threadText}>{dataQuestion.question}</Text>
          </View>

          <View style={styles.calculationWrapper}>
            {dataConverted.map((item, index) => {
              if (operation.includes(item)) return <SignBox item={item} key={index} />;
              else if (item === '?') {
                return (
                  <NumberInput
                    key={index}
                    idx={indexOfInput}
                    editable={result !== '' ? false : true}
                    onChangeTextFunc={onChangeTextInput}
                    correctAnswer={correctAnswer[indexOfInput++]}
                    result={result}
                  />
                );
              } else return <NumberBox key={index} text={item} />;
            })}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#3D67FF' }}></View>
          <View
            style={{ width, height: '100%', borderTopLeftRadius: 75, backgroundColor: '#2662BB' }}
          >
            <Animated.View
              style={{
                display: 'flex',
                alignItems: 'center',
                width,
                height: '100%',
                borderTopLeftRadius: 75,
                backgroundColor: result === 'correct' ? '#8DEA85' : '#EE6E6E',
                opacity: fadeAnim,
              }}
            >
              {result === 'correct' && (
                <>
                  <Text style={styles.textShowAnswer}>Ch??nh x??c. B???n gi???i qu??!</Text>
                  <Text style={{ ...styles.textShowAnswer, marginTop: 0 }}>
                    B???n ???????c c???ng th??m 10 ??i???m
                  </Text>
                </>
              )}
              {result === 'incorrect' && (
                <>
                  <Text style={styles.textShowAnswer}>Ti???c qu??, sai m???t r???i! </Text>
                  <Text style={{ ...styles.textShowAnswer, marginTop: 0 }}>
                    ????p ??n ????ng: {showCorrectAnswer()}
                  </Text>
                </>
              )}
            </Animated.View>
          </View>
          <CustomButton
            text={result !== '' ? 'Ti???p t???c' : 'Tr??? l???i'}
            buttonStyles={buttonDisable ? styles.buttonStyles : styles.buttonStylesDisabled}
            textStyles={{ color: 'white' }}
            onPressFunc={onPressButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2662BB',
    alignItems: 'center',
  },
  top: {
    display: 'flex',
    width,
    height: height * 0.6 - 70,
    backgroundColor: '#3D67FF',
    borderBottomRightRadius: 75,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',

    width,
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: '#2662BB',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  threadWrapper: {
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: height * 0.08,

    backgroundColor: 'white',
    borderRadius: 20,
  },
  threadText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  calculationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: width * 0.8,
    marginHorizontal: width * 0.1,
  },
  buttonStyles: {
    backgroundColor: 'black',
    width: '50%',
    height: 60,
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStylesDisabled: {
    backgroundColor: '#C4C4C4',
    width: '50%',
    height: 60,
    position: 'absolute',
    bottom: height * 0.05,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    height: height * 0.3,
    width,
    position: 'relative',
  },
  textShowAnswer: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    marginTop: height * 0.05,
  },
});
