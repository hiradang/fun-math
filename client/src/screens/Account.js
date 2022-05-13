import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import UserRanking from '../utils/UserRanking';

import { useSelector } from 'react-redux';

function Account() {
  const { username } = useSelector((state) => state.taskReducer);
  const [dataExp, setDataExp] = useState([]);

  useEffect(() => {
    axios.get(`${Config.API_URL}/users/getExp`).then((res) => {
      if (res.data) {
        let tempData = res.data.map((user) => {
          return {
            url: user.profile_photo_path,
            exp: user.total_exp,
            userName: user.username,
            name: user.name,
          };
        });
        setDataExp(tempData);
      }
    });
  }, []);

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
