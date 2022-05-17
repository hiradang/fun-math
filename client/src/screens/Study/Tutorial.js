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
      console.log(res.data)
    });
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.title}>
        <Text style={styles.text}>0/10 phép tính đã học</Text>
      </View>
      <View style={styles.container}>
        <Image source = {{uri : urlImage}} resizeMode="cover" style={styles.image}></Image>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CustomButton
          buttonStyles={styles.button}
          textStyles={{ color: 'white' }}
          // pos="right"
          // iconName="next"
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
  },
  title: {
    //   flex: 1,
    backgroundColor: '#2662BB',
    justifyContent: 'center',
    height: 70,
    width: '100%',
  },
  container: {
    flex: 5,
    marginTop: '20%',
  },
  text: {
    color: 'white',

    fontSize: 20,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#000000',
    width: 200,
    height: 60,
  },
  image: {},
});
export default Tutorial;
