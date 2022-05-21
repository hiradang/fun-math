import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Config from 'react-native-config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomButton from '../utils/CustomButton';
import ConfirmModal from '../utils/ConfirmModal';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourseName, setCurrentCourseId } from '../redux/actions';

/* ----------------
  1. Khi login, có khóa mặc định là Phép cộng thì phải thêm các chương của khóa đó
  2. Tương tự với trang joinCourse, khi join một khóa học phải tạo chapter_user tương ứng với khóa học đó -> Done
  3. Khi thêm một chapter mới, cần thêm chapter_user mới cho những người dùng hiện tại đang join khóa đó -> Done
*/

export default function ListCourses({ navigation, route }) {
  const { currentCourseName, username } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  const [selCourse, setSelCourse] = useState({});
  const [notAllowSelCourses, setNotAllowSelCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [chosenCourseId, setChosenCourseId] = useState();

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [showModalWarning, setModalWarning] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = () => {
    axios
      .all([
        axios.get(`${Config.API_URL}/course_user/${username}`),
        axios.get(`${Config.API_URL}/courses`),
      ])
      .then(
        axios.spread((res1, res2) => {
          const courses = res1.data.map((course) => {
            return {
              course_id: course.course_id,
              course_name: course.Course.course_name,
              username: course.username,
              current_chapter: course.current_chapter,
              current_chapterName: course.Chapter.chapter_name,
              question_all_count: course.Course.question_all_count,
              question_learnt_count: course.question_learnt_count,
              is_done: course.is_done,
              total_exp: course.total_exp,
            };
          });

          // Set selCourse
          let tempSelCourse = courses.find((obj) => obj.course_name === currentCourseName);
          setSelCourse(tempSelCourse);

          // Set notAllowSelCourses
          let tempNotAllowSelCourses = courses.filter(
            (obj) => obj.course_name !== currentCourseName
          );
          setNotAllowSelCourses(tempNotAllowSelCourses);

          // Set Joined Courses Id
          let joinedCourseId = res1.data.map((course) => {
            return course.course_id;
          });

          // RES2
          const tempAllCourses = res2.data.map((course) => {
            return {
              course_name: course.course_name,
              course_id: course.course_id,
              hasJoined: joinedCourseId.includes(course.course_id),
            };
          });
          setAllCourses(tempAllCourses);
        })
      );
  };

  const renderCourse = (course, index) => {
    return (
      <TouchableOpacity
        style={styles.course}
        key={index}
        onPress={() => {
          dispatch(setCurrentCourseName(course.course_name));
          dispatch(setCurrentCourseId(course.course_id));
          AsyncStorage.mergeItem(
            'user',
            JSON.stringify({
              currentCourseName: course.course_name,
              currentCourseId: course.course_id,
            }),
            () => {
              navigation.navigate('Home');
            }
          );
        }}
      >
        <View style={styles.courseIconWrapper}>
          {course.course_name === 'Phép cộng' && <Octicons name="plus" size={35} color="black" />}
          {course.course_name === 'Phép nhân' && <Octicons name="x" size={35} color="black" />}
          {course.course_name === 'Phép trừ' && <Octicons name="dash" size={35} color="black" />}
          {course.course_name === 'Phép chia' && (
            <MaterialCommunityIcons name="division" size={35} color="black" />
          )}
        </View>
        <View style={styles.nameAndProgress}>
          <Text style={styles.nameCourse} numberOfLines={1}>
            {course.course_name}
          </Text>
          {course.is_done && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Đã hoàn thành
            </Text>
          )}
          {!course.is_done && course.total_exp > 0 && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              {course.current_chapterName}: {course.question_learnt_count}/
              {course.question_all_count}
            </Text>
          )}
          {!course.is_done && course.total_exp === 0 && (
            <Text style={styles.progressCourse} numberOfLines={1}>
              Chưa bắt đầu học
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCourseModal = (course, index) => {
    return (
      <TouchableOpacity key={index}>
        <View style={styles.rowCourse}>
          <Text style={styles.nameCourseModal} numberOfLines={1}>
            {course.course_name}
          </Text>

          <View>
            {course.hasJoined ? (
              <CustomButton
                buttonStyles={{ backgroundColor: '#555', width: 150, height: 50 }}
                textStyles={{ color: 'white', fontSize: 14 }}
                text="Đã tham gia"
                onPressFunc={() => {
                  Toast.show({
                    type: 'successToast',
                    text1: 'Bạn đã tham gia khóa này!',
                    visibilityTime: 2000,
                  });
                }}
              />
            ) : (
              <CustomButton
                buttonStyles={{ backgroundColor: '#000000', width: 150, height: 50 }}
                textStyles={{ color: 'white', fontSize: 16 }}
                text="Tham gia"
                onPressFunc={() => {
                  setChosenCourseId(course.course_id);
                  setModalWarning(true);
                }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const joinCourse = () => {
    axios
      .post(`${Config.API_URL}/course_user/create`, {
        username: username,
        courseId: chosenCourseId,
      })
      .then(() => {
        setModalWarning(false);
        fetchAPI();
      });
  };

  return (
    <View style={[styles.container, showModal ? styles.blurred : null]}>
      {/* See more course modal */}
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent={true}
        animationType="slide"
        hardwareAccelerated
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Tất cả các khóa học</Text>
              <AntDesign
                name="down"
                size={32}
                color="#CBD6FF"
                onPress={() => setShowModal(false)}
              />
            </View>
            {allCourses.map((obj, index) => renderCourseModal(obj, index))}
          </View>
        </View>
      </Modal>

      {/* Confirm modal , Vì cái này gốc nó là confirm cho warning nên successMessage và function
      truyền vào ở chỗ này sẽ hơi bị ngược một chút*/}
      {showModalWarning ? (
        <ConfirmModal
          showModal={showModalWarning}
          positiveFunc={joinCourse}
          negativeFunc={() => {
            setModalWarning(false);
          }}
          cancelFunc={() => setModalWarning(false)}
          header="Tham gia học"
          message="Bạn có chắc chắn muốn tham gia khóa học này?"
          negativeMessage="Hủy"
          positiveMessage="Đồng ý"
        />
      ) : null}

      {/* Studying Course */}
      <Text style={styles.selectedCourseTitle}>Khóa đang học</Text>
      {renderCourse(selCourse)}
      {notAllowSelCourses.length > 0 ? (
        <>
          <Text style={styles.selectedCourseTitle}>Khóa khác đã tham gia</Text>
          {notAllowSelCourses.map((obj, index) => renderCourse(obj, index))}
        </>
      ) : null}

      <View style={styles.buttonContainer}>
        <CustomButton
          buttonStyles={{ backgroundColor: '#000000', width: 200, height: 60, marginTop: 20 }}
          textStyles={{ color: 'white' }}
          text={'Xem thêm'}
          onPressFunc={() => setShowModal(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  blurred: {
    opacity: 0.7,
  },
  selectedCourseTitle: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#CBD6FF',
    fontWeight: '600',
  },
  course: {
    flex: 0.18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIconWrapper: {
    height: 60,
    width: 60,
    borderRadius: 30,

    backgroundColor: '#9FE0E0',
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#545B5B',
    borderWidth: 2,

    marginRight: 20,
  },
  nameAndProgress: {},
  nameCourse: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 8,
  },
  progressCourse: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  // modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: '#3D67FF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '74%',
    borderColor: '#000',
    borderWidth: 1,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    color: '#CBD6FF',
    fontWeight: '600',
  },
  rowCourse: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nameCourseModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    minWidth: 150,
  },
});
