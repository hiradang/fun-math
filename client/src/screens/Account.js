import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function Account() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/defaultProfile-girl.png')}
          />
          <Text style={styles.userName}>binhdang</Text>
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
      <View style={styles.rank}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2662BB',
    height: '100%',
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    color: '#999',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#3D67FF',
  },
  infoLeft: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  userName: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoRight: {
    flex: 3,
    marginLeft: 20,
    marginRight: 20,
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
  rank: {
    width: '80%',
    height: 100,
  },
});
export default Account;
