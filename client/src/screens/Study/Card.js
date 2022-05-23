import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomButton from '../../utils/CustomButton';

function Card(props) {
  const chooseAnwser = () => {
    if (!props.checkAnswer) {
      props.select(props.id);
      props.status(props.correct);
    }
  };
  return (
    <Pressable
      style={[
        styles.body,
        props.press ? { backgroundColor: '#EEF07B' } : { backgroundColor: 'white' },
        props.checkAnswer &&
          (props.correct
            ? { backgroundColor: '#8DEA85' }
            : props.press && { backgroundColor: '#EE6E6E' }),
      ]}
      onPress={chooseAnwser}
    >
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.11,
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: 15,
    borderRadius: 5,
  },
  title: {
    //   flex: 1,
    backgroundColor: '#2662BB',
    justifyContent: 'center',
    height: 70,
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
});
export default Card;
