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
import EditModal from './Add/EditModal';

const { width, height } = Dimensions.get('window');

export default function ListChapterAdmin({ navigation, route }) {
  const { courseName, courseId } = route.params;
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [idEdit, setIdEdit] = useState();

  const listChapter = [
    { id: 0, name: 'Chương 1', totalLesson: 5 },
    { id: 1, name: 'Chương 2', totalLesson: 6 },
    { id: 2, name: 'Chương 3', totalLesson: 7 },
    { id: 3, name: 'Chương 4', totalLesson: 4 },
    { id: 4, name: 'Chương 5', totalLesson: 5 },
    { id: 5, name: 'Chương 6', totalLesson: 9 },
    { id: 6, name: 'Chương 7', totalLesson: 10 },
  ];

  const deleteChapter = (id) => {};
  const addNewChapter = (newChapterName) => {
    // Xử lý thêm chương
    // Bắn alert
    setShowAddChapterModal(false);
  };

  const editChapterName = (newName) => {
    // Xử lý thay tên chương
    // Bắn alert
    // id của chương cần thay tên lưu trong state idEdit
    setShowEditNameModal(false);
  };

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity style={styles.chapter}>
      <View style={styles.courseIconWrapper}>
        <AntDesign name="staro" size={35} color="#333333" />
      </View>
      <View style={styles.nameAndLesson}>
        <Text style={styles.nameChapter} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.lessonChapter} numberOfLines={1}>
          Tổng số phép tính: {item.totalLesson ? item.totalLesson : 0}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Modal
        visible={showAddChapterModal}
        transparent
        onRequestClose={() => setShowAddChapterModal(false)}
        animationType="fade"
        hardwareAccelerated
      >
        <EditModal
          editOrAdd="add chapter"
          setVisible={() => setShowAddChapterModal(false)}
          onPressHandle={addNewChapter}
        />
      </Modal>

      <Modal
        visible={showEditNameModal}
        transparent
        onRequestClose={() => setShowEditNameModal(false)}
        animationType="fade"
        hardwareAccelerated
      >
        <EditModal
          editOrAdd="edit chapter"
          setVisible={() => setShowEditNameModal(false)}
          onPressHandle={editChapterName}
        />
      </Modal>

      <Text style={styles.title}>{courseName} - DANH SÁCH CHƯƠNG</Text>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={listChapter}
        renderItem={({ item, index }) => {
          if (listChapter.length > 0) {
            return (
              <TouchableOpacity
                style={styles.chapter}
                onPress={() =>
                  navigation.navigate('ListLessonAdmin', {
                    courseName: courseName,
                    courseId: courseId,
                    chapterName: item.name,
                    chapterId: item.id,
                  })
                }
              >
                <View style={styles.courseIconWrapper}>
                  <AntDesign name="staro" size={35} color="#333333" />
                </View>
                <View style={styles.nameAndLesson}>
                  <Text style={styles.nameChapter} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.lessonChapter} numberOfLines={1}>
                    Tổng số phép tính: {item.totalLesson ? item.totalLesson : 0}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    setIdEdit(item.id);
                    setShowEditNameModal(true);
                  }}
                >
                  <MaterialIcons name={'mode-edit'} size={20} color={'#1eb900'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    deleteChapter(item.id);
                  }}
                >
                  <FontAwesome5 name={'trash'} size={16} color={'#ff3636'} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => setShowAddChapterModal(true)}>
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
    fontSize: 18,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',

    marginTop: height * 0.04,
    marginBottom: height * 0.02,
  },
  chapter: {
    display: 'flex',
    backgroundColor: '#3D67FF',
    width,
    height: height * 0.13,
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
  nameAndLesson: {
    flex: 1,
  },
  nameChapter: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 8,
  },
  lessonChapter: {
    fontSize: 17,
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
