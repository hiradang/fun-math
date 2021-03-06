import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { setProfilePhotoPath } from '../redux/actions';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import ImagePicker from 'react-native-image-crop-picker';
import Storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import CustomButton from '../utils/CustomButton';

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
    })
      .then((newImage) => {
        // Delete image in Android/emulator
        RNFS.exists(image).then((exists) => {
          if (exists) {
            RNFS.unlink(image);
          }
        });
        setNewImage(newImage.path);
        setIsNewImage(true);
      })
      .catch((error) => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
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

            // POST data to server
            userInfo['profilePhotoPath'] = url;
            axios.post(`${Config.API_URL}/users/update`, userInfo).then(() => {});

            // Delete image in Android/emulator
            RNFS.exists(image).then((exists) => {
              if (exists) {
                RNFS.unlink(image);
              }
            });
          });
      });
    } else {
      axios.post(`${Config.API_URL}/users/update`, userInfo).then(() => {});
    }
    Toast.show({
      type: 'successToast',
      text1: 'Thay ?????i th??nh c??ng',
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          <Text style={styles.title}>T??n ????ng nh???p</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={username} editable={false} />
            <FontAwesome5 style={styles.icon} size={24} color="#14D39A" name="user-alt" />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>T??n ng?????i d??ng</Text>
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

        <View style={styles.saveButton}>
          <CustomButton
            buttonStyles={{
              backgroundColor: '#000000',
              width: 350,
              height: 60,
              marginTop: 20,
            }}
            textStyles={{ color: 'white' }}
            text={'L??u thay ?????i'}
            onPressFunc={submit}
          />
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
    width: 250,
    height: 250,
    borderRadius: 125,

    borderWidth: 1,
    borderColor: '#CCD4F3',
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
    fontSize: 20,
    fontWeight: '500',
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
    fontSize: 20,
    borderRadius: 20,
    paddingHorizontal: 60,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EditProfile;
