import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import UserRanking from '../utils/UserRanking';

import { useSelector } from 'react-redux';

function Account() {
  const { username } = useSelector((state) => state.taskReducer);

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
      url: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/240591961_276169177692117_2281620348846835296_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=730e14&_nc_ohc=NBjAFVibN84AX9OgAif&_nc_ht=scontent.fhan15-1.fna&oh=00_AT8EpTWT2u9Cia8t1o0NyNGqbJEczEi8Dqc-RFMG_3wlzw&oe=627FD616',
      exp: 400,
      userName: 'Hoa453',
      name: 'Đặng Thị Thanh Hoa',
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

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/defaultProfile-girl.png')}
          />
          <Text style={styles.userName}>{username}</Text>
        </View>
        <View style={styles.infoRight}>
          <View style={styles.item}>
            <Text style={styles.title}>Số ngày học liên tục</Text>
            <Text style={styles.number}>30</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.title}>Số phép tính</Text>
            <Text style={styles.number}>100</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.title}>Số khóa học</Text>
            <Text style={styles.number}>2</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.title}>Điểm tích lũy</Text>
            <Text style={styles.number}>20000 XP</Text>
          </View>
        </View>
      </View>
      <UserRanking dataExp={dataExp} userName={username} topExp={4} />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '8%',
    backgroundColor: '#3D67FF',
    marginBottom: '10%',
  },
  infoLeft: {
    flex: 0.25,
    marginHorizontal: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  userName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoRight: {
    flex: 0.75,
    marginLeft: 30,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 13,
    minWidth: 170,
    fontWeight: 'bold',
  },
  number: {
    color: '#FFA439',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
export default Account;