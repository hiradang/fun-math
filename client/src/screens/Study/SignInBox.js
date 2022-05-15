import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomButton from '../../utils/CustomButton';

function SignBox(props) {
  return (
    <Pressable style={[styles.body]}>
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
    width: 42,
    height: 34,
    marginTop: '5%',
    marginRight: '2%',
    marginLeft: '3%',
    borderRadius: 5,
    backgroundColor: '#424D73',
  },
  title: {
    //   flex: 1,
    backgroundColor: '#2662BB',
    justifyContent: 'center',
    height: 70,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});
export default SignBox;
