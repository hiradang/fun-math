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
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditModal from './Add/EditModal';

const { width, height } = Dimensions.get('window');

export default function ListCourseAdmin({ navigation }) {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [idEdit, setIdEdit] = useState();

  const listCourse = [
    { id: 0, name: 'Phép cộng', totalChapter: 15 },
    { id: 1, name: 'Phép trừ', totalChapter: 20 },
    { id: 2, name: 'Phép nhân', totalChapter: 10 },
    { id: 3, name: 'Phép chia', totalChapter: 25 },
  ];

  const deleteCourse = (id) => {};

  const addNewCourse = (newCourseName) => {
    // Xử lý thêm khóa học
    // Bắn alert
    setShowAddCourseModal(false);
  };

  const editCourseName = (newName) => {
    // Xử lý thay tên khóa học
    // Bắn alert
    // id của khóa học cần thay tên lưu trong state idEdit
    setShowEditNameModal(false);
  };

  const signCourse = ['Phép cộng', 'Phép trừ', 'Phép nhân', 'Phép chia']

  return (
    <View style={styles.container}>
      <Modal
        visible={showAddCourseModal}
        transparent
        onRequestClose={() => setShowAddCourseModal(false)}
        animationType="fade"
        hardwareAccelerated
      >
        <EditModal
          editOrAdd="add course"
          setVisible={() => setShowAddCourseModal(false)}
          onPressHandle={addNewCourse}
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
          editOrAdd="edit course"
          setVisible={() => setShowEditNameModal(false)}
          onPressHandle={editCourseName}
        />
      </Modal>

      <Text style={styles.title}>DANH SÁCH KHÓA HỌC</Text>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={listCourse}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.course}
            onPress={() =>
              navigation.navigate('ListChapterAdmin', {
                courseName: item.name,
                courseId: item.id,
              })
            }
          >
            <View style={styles.courseIconWrapper}>
              {item.name === 'Phép cộng' && <Octicons name="plus" size={35} color="#333333" />}
              {item.name === 'Phép nhân' && <Octicons name="x" size={35} color="#333333" />}
              {item.name === 'Phép trừ' && <Octicons name="dash" size={35} color="#333333" />}
              {item.name === 'Phép chia' && (
                <MaterialCommunityIcons name="division" size={35} color="#333333" />
              )}
              {!signCourse.includes(item.name) && (
                <AntDesign name="book" size={35} color="#333333" />
              )}
            </View>
            <View style={styles.nameAndChapter}>
              <Text style={styles.nameCourse} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.chapterCourse} numberOfLines={1}>
                Tổng số chương: {item.totalChapter ? item.totalChapter : 0}
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
                deleteCourse(item.id);
              }}
            >
              <FontAwesome5 name={'trash'} size={16} color={'#ff3636'} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => setShowAddCourseModal(true)}>
        <MaterialIcons name="note-add" size={30} color={'white'} />
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
    fontSize: 22,
    color: '#CBD6FF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
  },
  course: {
    display: 'flex',
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
  nameAndChapter: {
    flex: 1,
  },
  nameCourse: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 8,
  },
  chapterCourse: {
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
