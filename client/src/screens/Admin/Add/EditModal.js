import { StyleSheet, TextInput, View, Dimensions, Text } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../../utils/CustomButton';

const { width, height } = Dimensions.get('window');

export default function EditModal({ editOrAdd, setVisible, onPressHandle }) {
  const [name, setName] = useState('');

  let placeholder = '';
  if (editOrAdd === 'add course' || editOrAdd === 'edit course') placeholder = 'Tên khóa học';
  else if (editOrAdd === 'add chapter' || editOrAdd === 'edit chapter') placeholder = 'Tên chương';
  else placeholder = 'Tên bài học';

  const textButton = editOrAdd.search('add') != -1 ? 'Tạo' : 'Lưu';
  let titleText = '';
  if (editOrAdd === 'add course') titleText = 'Tạo khóa học mới';
  else if (editOrAdd === 'add chapter') titleText = 'Tạo chương mới';
  else if (editOrAdd === 'edit course') titleText = 'Thay đổi tên khóa học';
  else if (editOrAdd === 'edit chapter') titleText = 'Thay đổi tên chương';
  else titleText = 'Thay đổi tên bài học';
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.titleText}>{titleText}</Text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(value) => setName(value)}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Hủy"
            textStyles={{ color: 'white' }}
            buttonStyles={{
              backgroundColor: '#ff3636',
              width: '45%',
              height: 50,
              borderRadius: 10,
            }}
            onPressFunc={setVisible}
          />
          <CustomButton
            text={textButton}
            textStyles={{ color: 'white' }}
            buttonStyles={{
              backgroundColor: '#1eb900',
              width: '45%',
              height: 50,
              borderRadius: 10,
            }}
            onPressFunc={() => onPressHandle(name)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',

    height,
    width,
    backgroundColor: '#00000099',
  },
  body: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginTop: height * 0.28,

    width: width * 0.85,
    height: height * 0.26,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555555',
  },
  titleText: {
    color: 'black',
    fontSize: 22,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
