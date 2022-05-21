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
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from 'react-native-config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { triggerNotification } from '../../utils/RNFireBaseNotification';

import EditModal from './Add/EditModal';

const { width, height } = Dimensions.get('window');

export default function ListChapterAdmin({ navigation, route }) {
  const { courseName, courseId } = route.params;
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [nameEdit, setNameEdit] = useState('');
  const [listChapter, setListChapter] = useState([]);

  useEffect(() => {
    axios.get(`${Config.API_URL}/chapters/${courseId}`).then((res) => {
      setListChapter(res.data);
    });
  }, []);

  const deleteChapter = (id) => {
    axios.delete(`${Config.API_URL}/chapters/${id}`).then((res) => {
      Toast.show({
        type: 'successToast',
        text1: 'Xóa chương học thành công',
        visibilityTime: 2000,
      });
      const filteredChapter = listChapter.filter((chapter) => chapter.chapter_id !== id);
      setListChapter(filteredChapter);
    });
  };
  const addNewChapter = (newChapterName) => {
    // Xử lý thêm chương
    // Bắn alert
    axios
      .post(`${Config.API_URL}/chapters`, { chapter_name: newChapterName, course_id: courseId })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          Toast.show({
            type: 'errorToast',
            text1: res.data.error,
            visibilityTime: 2000,
          });
        } else {
          Toast.show({
            type: 'successToast',
            text1: 'Thêm chương học thành công',
            visibilityTime: 2000,
          });
          const newChapter = {
            chapter_id: res.data.chapter_id,
            chapter_name: res.data.chapter_name,
            totalLesson: 0,
          };
          setListChapter([...listChapter, newChapter]);

          // push notification to users who has subscribed to the topic
          triggerNotification({
            topic: 'new-chapter',
            courseName: courseName,
            chapterName: res.data.chapter_name,
          });
        }
      });
    setShowAddChapterModal(false);
  };

  const editChapterName = (newName) => {
    // Xử lý thay tên chương
    // Bắn alert
    // id của chương cần thay tên lưu trong state idEdit
    axios.post(`${Config.API_URL}/chapters/${idEdit}`, { chapter_name: newName }).then((res) => {
      if (res.data.error) {
        Toast.show({
          type: 'errorToast',
          text1: res.data.error,
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'successToast',
          text1: 'Sửa chương học thành công',
          visibilityTime: 2000,
        });
        const index = listChapter.findIndex((chapter) => chapter.chapter_id === idEdit);
        const filteredChapter = [...listChapter];
        filteredChapter[index].chapter_name = newName;
        setListChapter(filteredChapter);
      }
    });
    setShowEditNameModal(false);
  };

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
          value={nameEdit}
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
                  navigation.navigate('LessonAdmin', {
                    courseName: courseName,
                    chapterName: item.chapter_name,
                    chapterId: item.chapter_id,
                  })
                }
              >
                <View style={styles.courseIconWrapper}>
                  <AntDesign name="staro" size={35} color="#333333" />
                </View>
                <View style={styles.nameAndLesson}>
                  <Text style={styles.nameChapter} numberOfLines={1}>
                    {item.chapter_name}
                  </Text>
                  <Text style={styles.lessonChapter} numberOfLines={1}>
                    Tổng số phép tính: {item.totalLesson ? item.totalLesson : 0}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    setIdEdit(item.chapter_id);
                    setNameEdit(item.chapter_name);
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
                          deleteChapter(item.chapter_id);
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
