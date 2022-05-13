import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../utils/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserRanking from '../utils/UserRanking';

export default function Overview({ navigation }) {
  // lấy data gắn vào đây
  const currentProgress = {
    currentExp: 10,
    currentChapter: 10, // có nghĩa là đã xong được 10 chương
    currentLesson: 20, // tính trong cả khóa học
    totalLesson: 50, // tính trong cả khóa học
    isDone: false,
    // isDone này để check xem đã hoàn thành khóa học này hay chưa
    // Nếu đã hoàn thành khóa học rồi thì giao diện hơi khác 1 tí
  };

  // Vứt data theo form array này nhá
  const dataExp = [
    {
      url: 'https://scontent.fhan5-7.fna.fbcdn.net/v/t39.30808-6/275556449_3073573019626400_4091684758550137910_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=8bfeb9&_nc_ohc=63zB_xXfFbwAX_rnBPw&_nc_ht=scontent.fhan5-7.fna&oh=00_AT9BD0s3FErIDX0kVVLgGUIA521wzTXoLjDbW892ccBhiA&oe=627C50EE',
      exp: 100,
      userName: 'chaiTrinh123',
      name: 'Trịnh Mai Huy',
    },
    {
      url: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/38880568_992984567539842_5690922316779749376_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=8bfeb9&_nc_ohc=VYN0NtF2zNcAX8O6xix&tn=IYoWy33hlWEFkzrT&_nc_ht=scontent.fhan5-2.fna&oh=00_AT9ihT4p7GmPFej29N4obUi-f5npMWpcI2VvEi1FAawjDA&oe=629BA8C2',
      exp: 200,
      userName: 'binhUt456',
      name: 'Đặng Thị Bình',
    },
    {
      url: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/273709088_1353888431729563_3232172361839707412_n.jpg?_nc_cat=104&ccb=1-6&_nc_sid=174925&_nc_ohc=CvX6na0kXtcAX_nOwBm&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_B-t12CsNB93G6wdBTSA7Ejm6Yo_Xm-qytH2Acf6R3ag&oe=627C7A6A',
      exp: 10,
      userName: 'hiraBui789',
      name: 'Bùi Thị Út Loan',
    },
    {
      url: 'https://allimages.sgp1.digitaloceanspaces.com/tipeduvn/2022/02/50-Anh-Meo-Cute-Ngau-Hinh-Avatar-Meo-De-Thuong.jpg',
      exp: 1,
      userName: 'MinhHoa01',
      name: 'Le Minh Huong',
    },
  ];

  const crUserName = 'MinhHoa01'; // user name của thằng người dùng hiện tại ném vào đây

  return (
    <View style={styles.container}>
      {!currentProgress.isDone && currentProgress.currentExp > 0 && (
        <View style={styles.isNotDone}>
          <View>
            <Text style={styles.progress}>
              Bài học tiếp theo: Chương {currentProgress.currentChapter + 1}
            </Text>
            <Text style={styles.crLesson}>
              Đã học {currentProgress.currentLesson}/{currentProgress.totalLesson} phép tính trong
              khóa học
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
              onPressFunc={() =>
                navigation.navigate('ListLesson', {
                  currentChapter: `Chương ${currentProgress.currentChapter + 1}`,
                  isDone: false,
                })
              }
            />
          </View>
        </View>
      )}
      {!currentProgress.isDone && currentProgress.currentExp == 0 && (
        <View style={styles.isNotDone}>
          <View>
            <Text style={{ ...styles.progress, textAlign: 'center', fontSize: 18 }}>
              Bạn chưa tham gia khóa học này
            </Text>
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
              onPressFunc={() =>
                navigation.navigate('ListCourse', {
                  currentChapter: currentProgress.currentChapter + 1,
                  isDone: false,
                })
              }
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
      <UserRanking dataExp={dataExp} userName={crUserName} topExp={3} />
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
