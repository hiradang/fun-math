import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Config from 'react-native-config';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import EditModal from './Add/EditModal';

const { width, height } = Dimensions.get('window');

export default function ListCourseAdmin({ navigation }) {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [nameEdit, setNameEdit] = useState('');

  const [listCourse, setListCourse] = useState([]);

  useEffect(() => {
    axios.get(`${Config.API_URL}/courses`).then((res) => {
      setListCourse(res.data);
    });
  }, []);

  // const listCourse = [
  //   { id: 0, name: 'Phép cộng', totalChapter: 15 },
  //   { id: 1, name: 'Phép trừ', totalChapter: 20 },
  //   { id: 2, name: 'Phép nhân', totalChapter: 10 },
  //   { id: 3, name: 'Phép chia', totalChapter: 25 },
  // ];

  const deleteCourse = (id) => {
    axios.delete(`${Config.API_URL}/courses/${id}`).then((res) => {
      Toast.show({
        type: 'successToast',
        text1: 'Xóa khóa học thành công',
        visibilityTime: 2000,
      });
      const filteredCourse = listCourse.filter((course) => course.course_id !== id);
      setListCourse(filteredCourse);
    });
  };

  const addNewCourse = (newCourseName) => {
    // Xử lý thêm khóa học
    axios.post(`${Config.API_URL}/courses`, { course_name: newCourseName }).then((res) => {
      if (res.data.error) {
        Toast.show({
          type: 'errorToast',
          text1: res.data.error,
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'successToast',
          text1: 'Thêm khóa học thành công',
          visibilityTime: 2000,
        });
        const newCourse = {
          course_id: res.data.course_id,
          course_name: res.data.course_name,
          totalChapter: 0,
        };
        setListCourse([...listCourse, newCourse]);
      }
    });
    // Bắn alert
    setShowAddCourseModal(false);
  };

  const editCourseName = (newName) => {
    // Xử lý thay tên khóa học
    axios.post(`${Config.API_URL}/courses/${idEdit}`, { course_name: newName }).then((res) => {
      if (res.data.error) {
        Toast.show({
          type: 'errorToast',
          text1: res.data.error,
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'successToast',
          text1: 'Sửa khóa học thành công',
          visibilityTime: 2000,
        });
        const index = listCourse.findIndex((course) => course.course_id === idEdit);
        const filteredCourse = [...listCourse];
        filteredCourse[index].course_name = newName;
        setListCourse(filteredCourse);
      }
    });
    // Bắn alert
    // id của khóa học cần thay tên lưu trong state idEdit
    setShowEditNameModal(false);
  };

  const signCourse = ['Phép cộng', 'Phép trừ', 'Phép nhân', 'Phép chia'];

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
          value={nameEdit}
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
              navigation.navigate('ChapterAdmin', {
                courseName: item.course_name,
                courseId: item.course_id,
              })
            }
          >
            <View style={styles.courseIconWrapper}>
              {item.course_name === 'Phép cộng' && (
                <Octicons course_name="plus" size={35} color="#333333" />
              )}
              {item.course_name === 'Phép nhân' && (
                <Octicons course_name="x" size={35} color="#333333" />
              )}
              {item.course_name === 'Phép trừ' && (
                <Octicons course_name="dash" size={35} color="#333333" />
              )}
              {item.course_name === 'Phép chia' && (
                <MaterialCommunityIcons name="division" size={35} color="#333333" />
              )}
              {!signCourse.includes(item.course_name) && (
                <AntDesign name="book" size={35} color="#333333" />
              )}
            </View>
            <View style={styles.nameAndChapter}>
              <Text style={styles.nameCourse} numberOfLines={1}>
                {item.course_name}
              </Text>
              <Text style={styles.chapterCourse} numberOfLines={1}>
                Tổng số chương: {item.totalChapter ? item.totalChapter : 0}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setIdEdit(item.course_id);
                setNameEdit(item.course_name);
                setShowEditNameModal(true);
              }}
            >
              <MaterialIcons name={'mode-edit'} size={20} color={'#1eb900'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                Alert.alert('Xóa', 'Bạn có chắc chắn muốn xóa khóa học này', [
                  {
                    text: 'Chắc chắn',
                    style: 'cancel',
                    onPress: () => {
                      deleteCourse(item.course_id);
                    },
                  },
                  {
                    text: 'Hủy',
                  },
                ]);
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
    fontSize: 15,
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
