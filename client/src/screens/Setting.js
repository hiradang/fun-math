import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Setting({ navigation }) {
  const [isRemind, setRemind] = useState(false);
  const [isNotiNewCourse, setNotiNewCourse] = useState(false);
  const [isNotiUpdate, setNotiUpdate] = useState(false);
  useEffect(() => {}, []);

  /// To-do
  /**
   * 1. Lưu các biến boolean ở trên vào Async Storage.
   * 2. Xử lý khi toggle ở nhắc nhở được mở hay tắt -> hiển thị thời gian và ngày cho phù hợp.
   * 3. xử lý khi nhấn vào nút đăng xuất.
   */

  const logOut = () => {
    AsyncStorage.removeItem('user');
    navigation.navigate('Start');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tài khoản */}
      <View style={styles.item}>
        <Text style={styles.title}>TÀI KHOẢN</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Chỉnh sửa profile</Text>
            <FontAwesome5
              size={24}
              color="#14D39A"
              name="pencil-alt"
              onPress={() => navigation.navigate('Chỉnh sửa tài khoản')}
            />
          </View>
        </View>
      </View>

      {/* Nhắc nhở */}
      <View style={styles.item}>
        <Text style={styles.title}>Nhắc nhở</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Bật nhắc nhở</Text>
            {isRemind ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={() => setRemind(!isRemind)}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={() => setRemind(!isRemind)}
              />
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Thời gian</Text>
            <Text style={styles.text}>20:00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Ngày</Text>
            <Text style={styles.text}>T2 - T6</Text>
          </View>
        </View>
      </View>

      {/* Thông báo */}
      <View style={styles.item}>
        <Text style={styles.title}>Thông báo</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Nhận thông báo khi có khóa học mới</Text>
            </View>

            {isNotiNewCourse ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={() => setNotiNewCourse(!isNotiNewCourse)}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={() => setNotiNewCourse(!isNotiNewCourse)}
              />
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>
                Nhận thông báo khi có bản cập nhật mới từ Google Play Store
              </Text>
            </View>

            {isNotiUpdate ? (
              <FontAwesome5
                size={24}
                color="#14D39A"
                name="toggle-on"
                onPress={() => setNotiUpdate(!isNotiUpdate)}
              />
            ) : (
              <FontAwesome5
                size={24}
                color="#ccc"
                name="toggle-off"
                onPress={() => setNotiUpdate(!isNotiUpdate)}
              />
            )}
          </View>
        </View>
      </View>

      {/* Thông tin*/}
      <View style={styles.item}>
        <Text style={styles.title}>Thông tin</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Phiên bản</Text>
            </View>
            <Text style={styles.text}>2022.03.30</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.textLeft}>
              <Text style={styles.text}>Phát triển bởi</Text>
            </View>
            <Text style={styles.text}>Đồng bằng rộng rãi</Text>
          </View>
        </View>
      </View>

      {/* Đăng xuất*/}
      <View style={styles.item}>
        <Text style={styles.title}>Đăng xuất</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.text}>Đăng xuất</Text>
            <MaterialIcons size={24} color="#E46B6B" name="logout" onPress={logOut} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D67FF',
    height: '100%',
    textAlign: 'center',
  },
  item: {
    marginTop: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 10,
  },
  content: {
    backgroundColor: '#2662BB',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 6,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  textLeft: {
    maxWidth: '90%',
  },
});
export default Setting;
