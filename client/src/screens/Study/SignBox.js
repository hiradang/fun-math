import React from 'react';
import { View, Text, Dimensions,  } from 'react-native';
const { width, height } = Dimensions.get('window');


function SignBox(props) {
  const item = props.item;
  if (item === '-') item = '–';
  if (item === 'x') item = '✕';
  if (item === ':') item = '÷';
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#424D73',
        borderRadius: 5,
        width: width * 0.1,
        height: height * 0.05,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: '500',
        }}
      >
        {item}
      </Text>
    </View>
  );
}


export default SignBox;
