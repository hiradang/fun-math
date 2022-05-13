import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useSelector } from 'react-redux';

/* 
Note: 
1. Chỉnh sửa lại được link ảnh
2. Cách lưu ảnh
*/

function EditProfile() {
  const { username } = useSelector((state) => state.taskReducer);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/defaultProfile-girl.png')}
          />

          <View style={styles.editIconContainer}>
            <FontAwesome5
              size={30}
              color="#14D39A"
              name="pencil-alt"
              onPress={() => navigation.navigate('Chỉnh sửa tài khoản')}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Tên đăng nhập</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={username} editable={false} />
            <FontAwesome5 style={styles.icon} size={24} color="#14D39A" name="user-alt" />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Tên người dùng</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Sở thú Hà Nội" />
            <FontAwesome5 style={styles.icon} size={24} color="#14D39A" name="user-alt" />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Mật khẩu cũ</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} secureTextEntry placeholder="Mật khẩu cũ" />
            <FontAwesome5 style={styles.icon} size={24} color="#14D39A" name="lock" />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Mật khẩu mới</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} secureTextEntry placeholder="Mật khẩu mới" />
            <FontAwesome5 style={styles.icon} size={24} color="#14D39A" name="lock" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D67FF',
    height: '100%',
    textAlign: 'center',
  },
  imageContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  editIconContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -16,
    top: 50,
  },
  row: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 60,
  },
});
export default EditProfile;
