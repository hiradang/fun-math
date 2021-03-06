import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';

import CustomButton from '../utils/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserRanking from '../utils/UserRanking';

export default function Overview({ navigation }) {
  const { username, currentCourseId, currentCourseName } = useSelector(
    (state) => state.taskReducer
  );

  const [currentProgress, setCurrentProgress] = useState(null);
  const [dataExp, setDataExp] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .all([
          axios.post(`${Config.API_URL}/course_user`, {
            username: username,
            courseId: currentCourseId,
          }),
          axios.get(`${Config.API_URL}/course_user/courseId/${currentCourseId}`),
        ])
        .then(
          axios.spread((res1, res2) => {
            const course = res1.data;
            if (course === null) setCurrentProgress('');
            else {
              const temp = {
                currentExp: course.total_exp,
                currentChapter: course.current_chapter,
                currentChapterName: course.Chapter.chapter_name,
                questionAllCount: course.Course.question_all_count,
                questionLearntCount: course.question_learnt_count,
                isDone: course.is_done,
              };
              setCurrentProgress(temp);
            }

            // Res2
            let temp2 = res2.data.map((user) => {
              return {
                url: user.User.profile_photo_path,
                exp: user.total_exp,
                userName: user.username,
                name: user.User.name,
              };
            });
            setDataExp(temp2);
          })
        );
    }, [currentCourseId])
  );

  return (
    <View style={styles.container}>
      {currentProgress === '' && (
        <View style={styles.isDone}>
          <Text style={{ ...styles.progress, fontSize: 18 }}>
            B???n ch??a tham gia kh??a h???c n??o!!!
          </Text>
          <View style={styles.isDoneIcon}>
            <FontAwesome name="hand-o-right" size={40} color="black" />
            <FontAwesome name="hand-o-left" size={40} color="black" />
          </View>
        </View>
      )}
      {currentProgress !== null &&
        !currentProgress.isDone &&
        currentProgress.questionLearntCount > 0 && (
          <View style={styles.isNotDone}>
            <View>
              <Text style={styles.progress}>
                B??i h???c ti???p theo: {currentProgress.currentChapterName}
              </Text>
              <Text style={styles.crLesson}>
                ???? h???c {currentProgress.questionLearntCount}/{currentProgress.questionAllCount} ph??p
                t??nh trong kh??a h???c.
              </Text>
            </View>
            <View style={styles.button}>
              <CustomButton
                text="Ti???p t???c h???c"
                buttonStyles={{
                  backgroundColor: 'black',
                  width: '90%',
                  height: 50,
                }}
                textStyles={{
                  color: 'white',
                }}
                onPressFunc={() =>
                  navigation.navigate('ListLesson', {
                    currentChapter: currentProgress.currentChapterName,
                    currentChapterId: currentProgress.currentChapter,
                    isDone: false,
                  })
                }
              />
            </View>
          </View>
        )}
      {currentProgress !== null &&
        !currentProgress.isDone &&
        currentProgress.questionLearntCount == 0 && (
          <View style={styles.isNotDone}>
            <View>
              <Text style={{ ...styles.progress, textAlign: 'center', fontSize: 18 }}>
                Kh??m ph?? th??? gi???i c???a {currentCourseName} ngay th??i n??o!
              </Text>
            </View>
            <View style={styles.button}>
              <CustomButton
                text="B???t ?????u h???c"
                buttonStyles={{
                  backgroundColor: 'black',
                  width: '90%',
                  height: 50,
                }}
                textStyles={{
                  color: 'white',
                }}
                onPressFunc={() =>
                  navigation.navigate('ListLesson', {
                    currentChapter: currentProgress.currentChapterName,
                    currentChapterId: currentProgress.currentChapter,
                    isDone: false,
                  })
                }
              />
            </View>
          </View>
        )}
      {currentProgress !== null && currentProgress.isDone && (
        <View style={styles.isDone}>
          <Text style={{ ...styles.progress, fontSize: 18 }}>
            B???n ???? ho??n th??nh kh??a h???c n??y!!!
          </Text>
          <View style={styles.isDoneIcon}>
            <FontAwesome name="hand-o-right" size={40} color="black" />
            <FontAwesome name="hand-o-left" size={40} color="black" />
          </View>
        </View>
      )}
      {dataExp.length > 0 ? <UserRanking dataExp={dataExp} userName={username} topExp={3} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3D67FF',
  },
  isNotDone: {
    flex: 0.18,
    justifyContent: 'space-between',

    backgroundColor: 'white',
    width: '85%',
    elevation: 5,

    paddingHorizontal: 24,
    paddingVertical: 15,

    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#CCD4F3',
  },
  isDone: {
    flex: 0.12,
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: 'white',
    width: '85%',
    elevation: 5,

    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#CCD4F3',
  },
  progress: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  crLesson: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  button: {
    alignItems: 'center',
  },
  isDoneIcon: {
    flexDirection: 'row',
  },
});
