import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

export default function Study({ navigation }) {
  const listChapter = [
    { name: 'Chương 1', isDone: true },
    { name: 'Chương 2', isDone: false },
    { name: 'Chương 3', isDone: false },
    { name: 'Chương 4', isDone: false },
    { name: 'Chương 5', isDone: false },
    { name: 'Chương 6', isDone: false },
    { name: 'Chương 7', isDone: false },
  ];

  const lengthOfList = listChapter.length;

  const onPressChapter = (item, index) => {
    if (index == 0) navigation.navigate('ListLesson', { currentChapter: item.name, isDone: item.isDone });
    else {
      if (listChapter[index - 1].isDone) {
        navigation.navigate('ListLesson', { currentChapter: item.name, isDone: item.isDone });
      } else {
        Toast.show({
          type: 'disableToast',
          text1: `Hãy hoàn thành ${listChapter[index - 1].name}`,
          visibilityTime: 2000,
        });
      }
    }
  };

  const checkDisabled = (chapter, index) =>
    chapter.isDone || index == 0 || listChapter[index - 1].isDone;

  return (
    <ScrollView style={styles.container}>
      {listChapter.map((item, index) => {
        return (
          <View style={styles.chapterContainer} key={item.name}>
            {index == 0 && <View style={{ height: 25 }}></View>}
            <TouchableOpacity onPress={() => onPressChapter(item, index)}>
              <View style={checkDisabled(item, index) ? styles.chapter : styles.chapterDisabled}>
                <FontAwesome5
                  name={item.isDone ? 'book' : 'book-open'}
                  size={50}
                  color={checkDisabled(item, index) ? '#54135A' : '#EBEBE4'}
                  style={item.isDone ? styles.iconDone : styles.iconNotDone}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={checkDisabled(item, index) ? styles.chapterName : styles.chapterNameDisabled}
            >
              {item.name}
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
