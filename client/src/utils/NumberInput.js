import { Dimensions, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
const { width, height } = Dimensions.get('window');

export default function NumberInput({
  onChangeTextFunc,
  editable,
  correctAnswer,
  result,
  idx,
}) {
  const [answer, setAnswer] = useState('');
  const changeColor = () => {
    const isShow = result === 'correct' || result === 'incorrect';
    if (answer === correctAnswer && isShow === true) return '#8DEA85';
    else if (answer !== correctAnswer && isShow === true) return '#EE6E6E';
    else return 'white';
  };

  return (
    <TextInput
      editable={editable}
      onChangeText={(value) => {
        onChangeTextFunc(value, idx);
        setAnswer(value);
      }}
      style={{
        ...styles.textInput,
        backgroundColor: changeColor(),
      }}
      keyboardType="number-pad"
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    color: '#424D73',
    fontSize: 24,
    fontWeight: '500',

    borderRadius: 5,
    width: width * 0.15,
    height: height * 0.078,
  },
});
