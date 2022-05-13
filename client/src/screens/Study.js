import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import axios from 'axios';

import { useSelector } from 'react-redux';

export default function Study({ navigation }) {
  const { username, currentCourseId } = useSelector((state) => state.taskReducer);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios
      .get(`${Config.API_URL}/chapter_user`, {
        username: username,
        course_id: currentCourseId,
      })
      .then((res) => {
        setChapters(res.data);
      });
  }, []);

  const lengthOfList = chapters.length;

  const onPressChapter = (item, index) => {
    if (index == 0)
      navigation.navigate('ListLesson', {
        currentChapter: item.chapter_name,
        isDone: item.is_done,
      });
    else {
      if (chapters[index - 1].is_done) {
        navigation.navigate('ListLesson', {
          currentChapter: item.chapter_name,
          isDone: item.is_done,
        });
      } else {
        Toast.show({
          type: 'disable',
          text1: `Hãy hoàn thành ${chapters[index - 1].chapter_name}`,
          visibilityTime: 2000,
        });
      }
    }
  };

  const checkDisabled = (chapter, index) =>
    chapter.is_done || index == 0 || chapters[index - 1].is_done;

  return (
    <ScrollView style={styles.container}>
      {chapters.map((item, index) => {
        return (
          <View style={styles.chapterContainer} key={item.chapter_id}>
            {index == 0 && <View style={{ height: 25 }}></View>}
            <TouchableOpacity onPress={() => onPressChapter(item, index)}>
              <View style={checkDisabled(item, index) ? styles.chapter : styles.chapterDisabled}>
                <FontAwesome5
                  name={item.is_done ? 'book' : 'book-open'}
                  size={50}
                  color={checkDisabled(item, index) ? '#54135A' : '#EBEBE4'}
                  style={item.is_done ? styles.iconDone : styles.iconNotDone}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={checkDisabled(item, index) ? styles.chapterName : styles.chapterNameDisabled}
            >
              {item.chapter_name}
            </Text>
            {index < lengthOfList - 1 && (
              <Entypo
                name="dots-three-vertical"
                size={36}
                color="#97abf3"
                style={styles.iconSeparate}
              />
            )}
            {index == lengthOfList - 1 && <View style={{ height: 25 }}></View>}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
  },
  chapterContainer: {
    flex: 0.32,
    alignItems: 'center',
  },
  chapter: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: '#97ABF3',

    borderWidth: 5,
    borderColor: '#C4C4C4',
  },
  chapterDisabled: {
    height: 96,
    width: 96,
    borderRadius: 48,
    backgroundColor: '#C4C4C4',

    borderWidth: 5,
    borderColor: '#EBEBE4',
  },
  chapterName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  chapterNameDisabled: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C4C4C4',
    marginTop: 5,
  },
  iconNotDone: {
    position: 'relative',
    top: 18,
    left: 15.5,
  },
  iconDone: {
    position: 'relative',
    top: 16,
    left: 20,
  },
  iconSeparate: {
    marginVertical: 20,
  },
});
