import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

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

  const onPressChapter = () => navigation.navigate('Lession', {chapter_id: 1});

  return (
    <ScrollView style={styles.container}>
      {listChapter.map((item) => {
        return (
          <View style={styles.chapterContainer} key={item.name}>
            {listChapter.indexOf(item) == 0 && <View style={{ height: 25 }}></View>}
            <TouchableOpacity onPress={onPressChapter}>
              <View style={styles.chapter}>
                {item.isDone && (
                  <FontAwesome5 name="book" size={50} color="#54135A" style={styles.iconDone} />
                )}
                {!item.isDone && (
                  <FontAwesome5
                    name="book-open"
                    size={50}
                    color="#54135A"
                    style={styles.iconNotDone}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.chapterName}>{item.name}</Text>
            {listChapter.indexOf(item) < lengthOfList - 1 && (
              <Entypo
                name="dots-three-vertical"
                size={36}
                color="#97abf3"
                style={styles.iconSeparate}
              />
            )}
            {listChapter.indexOf(item) == lengthOfList - 1 && <View style={{ height: 25 }}></View>}
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
  chapterName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
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
    marginVertical: 15,
  },
});
