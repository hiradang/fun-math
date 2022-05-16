import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { setProfilePhotoPath } from '../redux/actions';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import Storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

/*
  1. Khi thay ảnh mới, cần update được ảnh ở hai bảng xếp hạng -> Done
  2. Làm cái đổi tên  -> done
  2.1. Xóa trong android/emulator -> RNFS
  2.2. Xử lý khi người dùng hủy việc chọn ảnh
  2.2. Xử lý lại việc fetch data ở màn ListCourses, Home, Overview
  3. Chỉnh lại giao diện của trang EditProfile
  4. Làm popup khi người dùng logout
  5. Chỉnh lại Model user, bỏ trường current_course_name
  6. Thêm các course_user khi người dùng tham gia vào khóa học (optional - Cần bàn lại)
  7. Làm trang tài khoản, số ngày học, khóa học, tích lũy, phép tính,........
*/

function EditProfile() {
  const { username, name, profilePhotoPath } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  const [image, setNewImage] = useState(profilePhotoPath);
  const [newName, setNewName] = useState(name);
  const [isNewImage, setIsNewImage] = useState(false);

  const editProfilePicture = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: true,
    }).then((image) => {
      // if (newImage) RNFS.unlink(newImage);
      setNewImage(image.path);
      setIsNewImage(true);
    });
  };

  const uploadImageFirebase = async () => {
    // save the image as username
    let filename = username;
    // let filename = image.substring(image.lastIndexOf('/') + 1);
    try {
      await Storage().ref(filename).putFile(image);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = () => {
    let userInfo = { username: username };
    userInfo['name'] = newName;
    if (isNewImage) {
      uploadImageFirebase().then(() => {
        Storage()
          .ref(username)
          .getDownloadURL()
          .then((url) => {
            // Save to redux and Async Storage
            dispatch(setProfilePhotoPath(url));
            AsyncStorage.mergeItem(
              'user',
              JSON.stringify({
                profilePhotoPath: url,
              })
            );
            userInfo['profilePhotoPath'] = url;
            axios.post(`${Config.API_URL}/users/update`, userInfo).then(() => {});
          });
      });
    } else {
      axios.post(`${Config.API_URL}/users/update`, userInfo).then(() => {});
    }
    Toast.show({
      type: 'successToast',
      text1: 'Thay đổi thành công',
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.saveButton}>
          <Feather name="check" size={40} color="#14D39A" onPress={submit} />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />

          <View style={styles.editIconContainer}>
            <FontAwesome5
              size={30}
              color="#14D39A"
              name="pencil-alt"
              onPress={editProfilePicture}
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
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={(value) => setNewName(value)}
            />
            <FontAwesome5
              style={styles.icon}
              size={24}
              color="#14D39A"
              name="user-alt"
              onChangeText={() => {}}
            />
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
  saveButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 75,
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
