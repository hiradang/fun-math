import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
const { width, height } = Dimensions.get('window');


function NumberBox(props) {

  const number = props.text;
  let widthBox = width * 0.11;
  if (number > 99) {
    widthBox = width * 0.15;
  }
  if (number > 999) {
    widthBox = width * 0.19;
  }
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#424D73',
        borderRadius: 5,
        width: widthBox,
        height: height * 0.078,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: '500',
        }}
      >
        {number}
      </Text>
    </View>
  );
}

export default NumberBox;
