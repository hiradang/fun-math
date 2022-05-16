import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CustomButton from '../utils/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserRanking from '../utils/UserRanking';

export default function Overview(props) {
  const { username } = useSelector((state) => state.taskReducer);
  const currentProgress = props.currentProgress;
  const dataExp = props.dataExp;

  return (
    <View style={styles.container}>
      {!currentProgress.isDone && currentProgress.currentExp > 0 && (
        <View style={styles.isNotDone}>
          <View>
            <Text style={styles.progress}>Tiến độ</Text>
            <Text style={styles.crLesson}>
              Chương {currentProgress.currentChapter}: {currentProgress.questionLearntCount}/
              {currentProgress.questionAllCount} phép tính
            </Text>
          </View>
          <View style={styles.button}>
            <CustomButton
              text="Tiếp tục học"
              buttonStyles={{
                backgroundColor: 'black',
                width: '90%',
                height: 50,
              }}
              textStyles={{
                color: 'white',
              }}
            />
          </View>
        </View>
      )}
      {!currentProgress.isDone && currentProgress.currentExp == 0 && (
        <View style={styles.isNotDone}>
          <View>
            <Text style={styles.progress}>Tiến độ</Text>
            <Text style={styles.crLesson}>Bạn chưa hoàn thành bài học nào</Text>
          </View>
          <View style={styles.button}>
            <CustomButton
              text="Bắt đầu học"
              buttonStyles={{
                backgroundColor: 'black',
                width: '90%',
                height: 50,
              }}
              textStyles={{
                color: 'white',
              }}
            />
          </View>
        </View>
      )}
      {currentProgress.isDone && (
        <View style={styles.isDone}>
          <Text style={{ ...styles.progress, fontSize: 18 }}>
            Bạn đã hoàn thành khóa học này!!!
          </Text>
          <View style={styles.isDoneIcon}>
            <FontAwesome name="hand-o-right" size={40} color="black" />
            <FontAwesome name="hand-o-left" size={40} color="black" />
          </View>
        </View>
      )}
      {dataExp ? <UserRanking dataExp={dataExp} userName={username} topExp={3} /> : null}
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
    flex: 0.2,
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
    fontWeight: 'bold',
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
