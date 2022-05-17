import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../utils/CustomButton';
import Fontisto from 'react-native-vector-icons/Fontisto'; //clock
import AntDesign from 'react-native-vector-icons/AntDesign'; //Trophy

export default function ListLesson({ navigation, route }) {
  const { currentChapter, isDone } = route.params;

  const currentCourse = 'Phép cộng';

  React.useEffect(() => {
    navigation.setOptions({
      title: currentChapter,
    });
  }, []);

  // Bình lấy danh sách phép tính tương ứng với khóa học và chương có ở trên kia
  // rồi ném vào listLesson này (chỉ cần lấy tên vì như t đã bàn với Bình hôm trước rồi)
  const listLesson = ['1 + 1', '1 + 2', '1 + 3', '1 + 4', '2 + 1', '3 + 2', '4 + 1'];
  const length = listLesson.length;

  const renderButton = () => {
    if (isDone) {
      return (
        <CustomButton
          text="Luyện tập"
          buttonStyles={{
            backgroundColor: 'black',
            width: '56%',
            height: 60,
            position: 'absolute',
            bottom: '6%',
            left: '22%',
          }}
          textStyles={{
            color: 'white',
          }}
          pos="left"
          iconName="hand-rock-o"
          iconSize={28}
          iconColor="white"
          onPressFunc={() => {
            navigation.navigate('Lesson', { chapter_id: 1 });
          }}
        />
      );
    } else {
      return (
        <CustomButton
          text="Bắt đầu"
          buttonStyles={{
            backgroundColor: 'black',
            width: '56%',
            height: 60,
            position: 'absolute',
            bottom: '6%',
            left: '22%',
          }}
          textStyles={{
            color: 'white',
          }}
          // onPressFunc={() => navigation.navigate('TypeFormat')}
          pos="left"
          iconName="hand-peace-o"
          iconSize={28}
          iconColor="white"
          onPressFunc={() => {
            navigation.navigate('Lesson', { chapter_id: 1 });
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chapterOverview}>
        <Text style={styles.overviewText}>
          {currentCourse} - {currentChapter}: {length} phép tính
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Các phép tính cần học</Text>
      </View>
      <ScrollView style={styles.lessonContainer}>
        {listLesson.map((item) => {
          return (
            <View style={styles.lesson} key={item}>
              <View style={styles.statusIcon}>
                {!isDone && <Fontisto name="clock" size={32} color="#333333" />}
                {isDone && <AntDesign name="Trophy" size={32} color="#333333" />}
              </View>
              <Text style={styles.lessonName}>{item}</Text>
            </View>
          );
        })}
      </ScrollView>

      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D67FF',
    position: 'relative',
  },
  chapterOverview: {
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: '#2662BB',
    width: '100%',
    height: 70,
    paddingHorizontal: 20,
  },
  overviewText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',

    width: '100%',
    height: 70,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  lesson: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 90,

    borderTopColor: '#C4C4C4',
    borderTopWidth: 1,
  },
  statusIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    marginHorizontal: 30,

    borderRadius: 30,
    backgroundColor: '#97ABF3',

    borderWidth: 5,
    borderColor: '#C4C4C4',
  },
  lessonName: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
});
