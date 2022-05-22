import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Config from 'react-native-config';

import CustomButton from '../../utils/CustomButton';

function Tutorial(props) {
  const [urlImage, setUrlImage] = useState(null);
  useEffect(() => {
    axios.get(`${Config.API_URL}/questions/image/${props.question_id}`).then((res) => {
      setUrlImage(res.data.question_image);
    });
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.title}>
        <Text style={styles.text}>
          {props.indexQuestion}/{props.totalLesson} phép tính đã học
        </Text>
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: urlImage }}
          style={{ width: 400, height: 400 }}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CustomButton
          buttonStyles={styles.button}
          textStyles={{ color: 'white' }}
          text={'Tiếp tục'}
          onPressFunc={() => props.changeTypeQuestion()}
        />
      </View>
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
    backgroundColor: '#2662BB',
    justifyContent: 'center',
    height: 70,
    paddingHorizontal: 20,
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  container: {
    flex: 5,
    marginTop: '20%',
  },
  button: {
    backgroundColor: '#000000',
    width: 200,
    height: 60,
  },
  image: {},
});
export default Tutorial;
