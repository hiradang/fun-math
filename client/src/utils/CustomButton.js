import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// props.pos = 'left' hoặc 'right' để chọn vị trí cho icon

export default function CustomButton(props) {
  return (
    <TouchableOpacity style={[styles.button, props.buttonStyles]} onPress={props.onPressFunc}>
      {props.pos === 'left' && (
        <FontAwesome name={props.iconName} size={props.iconSize} color={props.iconColor} />
      )}
      <Text style={[styles.text, props.textStyles]} numberOfLines={1}>
        {props.text}
      </Text>
      {props.pos === 'right' && (
        <FontAwesome name={props.iconName} size={props.iconSize} color={props.iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginHorizontal: 20,
  },
});
