import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';


const Input = (props) => {
  return (
    <View style={[props.style, styles.view]}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.row}>
        <View style={[styles.icon, props.error && styles.iconError]}>
          <FontAwesome5 name={props.icon} size={24} color={'#14D39A'} />
        </View>
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#7E7E7E"
          secureTextEntry={props.secureTextEntry ? true : false}
          onChangeText={(value) => props.onChangeText(value)}
          style={[styles.input, props.error && styles.inputError]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 30,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '500',
  },
  row: {
    height: 50,
    flexDirection: 'row',
  },
  input: {
    width: '75%',
    height: 50,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    color: '#000000',
    marginTop: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  inputError: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    borderRightWidth: 2,
    borderRightColor: 'red',
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
  icon: {
    width: 60,
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconError: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
});

export default Input;
