import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function ListLessonAdmin({ navigation, route }) {
  const { courseName, courseId, chapterName, chapterId } = route.params;

  const listLesson = [
    { id: 0, name: '1 + 1' },
    { id: 1, name: '1 + 2' },
    { id: 2, name: '1 + 3' },
    { id: 3, name: '1 + 4' },
    { id: 4, name: '2 + 1' },
    { id: 5, name: '3 + 2' },
    { id: 6, name: '4 + 1' },
  ];

  const deleteLesson = (id) => {};


  return (
    <View style={styles.container}>

      <Text style={styles.title}>{courseName} </Text>
      <Text style={styles.subTitle}>{chapterName} - DANH SÁCH PHÉP TÍNH</Text>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={listLesson}
        renderItem={({ item, index }) => {
          if (listLesson.length > 0) {
            return (
              <View style={styles.lesson}>
                <View style={styles.courseIconWrapper}>
                  <AntDesign name="Trophy" size={32} color="#333333" />
                </View>
                <View style={styles.name}>
                  <Text style={styles.nameLesson} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    navigation.navigate('EditLesson', {
                      courseName: courseName,
                      courseId: courseId,
                      chapterName: chapterName,
                      chapterId: chapterId,
                      lessonId: item.id,
                    });
                  }}
                >
                  <MaterialIcons name={'mode-edit'} size={20} color={'#1eb900'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    deleteLesson(item.id);
                  }}
                >
                  <FontAwesome5 name={'trash'} size={16} color={'#ff3636'} />
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('AddLesson', {
            courseName: courseName,
            courseId: courseId,
            chapterName: chapterName,
            chapterId: chapterId,
          })
        }
      >
        <FontAwesome5 name={'plus'} size={28} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',

    marginTop: height * 0.04,
  },
  subTitle: {
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',

    marginTop: 5,
    marginBottom: height * 0.02,
  },
  lesson: {
    display: 'flex',
    backgroundColor: '#3D67FF',
    width,
    height: 90,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIconWrapper: {
    height: 60,
    width: 60,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#97ABF3',

    borderWidth: 5,
    borderColor: '#C4C4C4',

    marginRight: 20,
  },
  name: {
    flex: 1,
  },
  nameLesson: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

    top: height * 0.78,
    right: width * 0.5 - 30,
    elevation: 5,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

    marginLeft: 12,
  },
});
