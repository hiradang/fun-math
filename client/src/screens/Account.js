import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import UserRanking from '../utils/UserRanking';

import { useSelector } from 'react-redux';

function Account({ navigation }) {
  const { username, profilePhotoPath, totalExp } = useSelector((state) => state.taskReducer);
  const [dataExp, setDataExp] = useState(null);
  const [learningCourses, setCourses] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      axios
        .all([
          axios.get(`${Config.API_URL}/users/getExp`),
          axios.get(`${Config.API_URL}/course_user/${username}`),
        ])
        .then(
          axios.spread((res1, res2) => {
            if (res1.data) {
              let tempData = res1.data.map((user) => {
                return {
                  url: user.profile_photo_path,
                  exp: user.total_exp,
                  userName: user.username,
                  name: user.name,
                };
              });
              setDataExp(tempData);
            }

            if (res2.data) {
              let temp = res2.data.map((course) => {
                return {
                  course_id: course.course_id,
                  question_learnt_count: course.question_learnt_count,
                  total_exp: course.total_exp,
                };
              });
              setCourses(temp);
            }
          })
        );
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Image style={styles.profileImage} source={{ uri: profilePhotoPath }} />
          <Text style={styles.userName}>{username}</Text>
        </View>
        <View style={styles.infoRight}>
          <View style={styles.item}>
            <Text style={styles.title}>Số phép tính</Text>
            <Text style={styles.number}>
              {learningCourses.length > 0
                ? learningCourses.reduce((sum, course) => sum + course.question_learnt_count, 0)
                : 0}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.title}>Số khóa học</Text>
            <Text style={styles.number}>{learningCourses.length}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.title}>Điểm tích lũy</Text>
            <Text style={styles.number}>
              {learningCourses.length > 0
                ? learningCourses.reduce((sum, course) => sum + course.total_exp, 0)
                : 0}{' '}
              XP
            </Text>
          </View>
        </View>
      </View>
      {dataExp ? <UserRanking dataExp={dataExp} userName={username} topExp={4} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2662BB',
    alignItems: 'center',
  },
  info: {
    flex: 0.24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: '8%',
    backgroundColor: '#3D67FF',
    marginBottom: '10%',
  },
  infoLeft: {
    flex: 0.25,
    textAlign: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCD4F3',
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoRight: {
    flex: 0.56,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
    minWidth: 170,
    fontWeight: 'bold',
  },
  number: {
    color: '#FFA439',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Account;
