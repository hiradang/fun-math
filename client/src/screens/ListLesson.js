import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';

import CustomButton from '../utils/CustomButton';
import Octicons from 'react-native-vector-icons/Octicons'; //clock
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; //trophy
import AntDesign from 'react-native-vector-icons/AntDesign'; //Trophy

export default function ListLesson({ navigation, route }) {
  const { currentChapter, isDone, currentChapterId } = route.params;
  
  const currentCourse = 'Phép cộng';
  const [listLesson, setListLesson] = useState([]);

  React.useEffect(() => {
    navigation.setOptions({
      title: currentChapter,
    });
    axios.get(`${Config.API_URL}/questions/${currentChapterId}`).then((res) => {
      setListLesson(res.data);
    });
  }, []);

  const length = listLesson.length;

  const study = () => {
    if (length > 0) {
      navigation.navigate('Lesson', { chapter_id: currentChapterId, isDone: isDone });
    } else {
      Toast.show({
        type: 'disableToast',
        text1: 'Chưa có bài học nào',
        visibilityTime: 2000,
      });
    }
  }

  const renderButton = () => {
    if (isDone) {
      return (
        <CustomButton
          text="Luyện tập"
          buttonStyles={{
            backgroundColor: 'black',
            width: '56%',
            height: 60,
            position: 'absolute',
            bottom: '6%',
            left: '22%',
          }}
          textStyles={{
            color: 'white',
          }}
          pos="left"
          iconName="hand-rock-o"
          iconSize={28}
          iconColor="white"
          onPressFunc={study}
        />
      );
    } else {
      return (
        <CustomButton
          text="Bắt đầu"
          buttonStyles={{
            backgroundColor: 'black',
            width: '56%',
            height: 60,
            position: 'absolute',
            bottom: '6%',
            left: '22%',
          }}
          textStyles={{
            color: 'white',
          }}
          pos="left"
          iconName="hand-peace-o"
          iconSize={28}
          iconColor="white"
          onPressFunc={study}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chapterOverview}>
        <Text style={styles.overviewText}>
          {currentCourse} - {currentChapter}: {length} phép tính
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Các phép tính cần học</Text>
      </View>
      <ScrollView style={styles.lessonContainer}>
        {listLesson && listLesson.map((item) => {
          return (
            <View style={styles.lesson} key={item.question_id}>
              <View style={styles.statusIcon}>
                {isDone === false ? (
                  <Octicons name="clock" size={32} color="#333333" />
                ) : (
                  <AntDesign name="Trophy" size={32} color="#333333" />
                )}
              </View>
              <Text style={styles.lessonName}>{item.question_name}</Text>
            </View>
          );
        })}
      </ScrollView>

      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
    position: 'relative',
  },
  chapterOverview: {
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: '#2662BB',
    width: '100%',
    height: 70,
    paddingHorizontal: 20,
  },
  overviewText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',

    width: '100%',
    height: 70,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  lesson: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 90,

    borderTopColor: '#C4C4C4',
    borderTopWidth: 1,
  },
  statusIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    marginHorizontal: 30,

    borderRadius: 30,
    backgroundColor: '#97ABF3',

    borderWidth: 5,
    borderColor: '#C4C4C4',
  },
  lessonName: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
});
