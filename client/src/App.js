import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

import ListCourses from './screens/ListCourses';
import HeaderStyles from './utils/HeaderStyles';
import Account from './screens/Account';
import Home from './screens/Home';
import Start from './screens/Start';
import SignUp from './screens/Auth/SignUp';
import LogIn from './screens/Auth/LogIn';
import Splash from './screens/Splash';
import Setting from './screens/Setting';
import EditProfile from './screens/EditProfile';
import ListLesson from './screens/ListLesson';
import Lesson from './screens/Lesson';
import EditPass from './screens/EditPass';
import ListCourseAdmin from './screens/Admin/ListCourseAdmin';
import ListChapterAdmin from './screens/Admin/ListChapterAdmin';
import ListLessonAdmin from './screens/Admin/ListLessonAdmin';
import SettingAdmin from './screens/Admin/SettingAdmin';
import AddLesson from './screens/Admin/Add/AddLesson';
import EditLesson from './screens/Admin/Add/EditLesson';

const Stack = createStackNavigator();

const toastConfig = {
  successToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#4BB543',
        borderLeftWidth: 8,
        elevation: 2,
      }}
    >
      <AntDesign name="checkcircleo" size={24} color="#4BB543" style={{ marginHorizontal: 12 }} />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#4BB543' }}>{text1}</Text>
    </View>
  ),

  errorToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#ff3333',
        borderLeftWidth: 8,
        elevation: 2,
      }}
    >
      <AntDesign name="closecircleo" size={24} color="#ff3333" style={{ marginHorizontal: 12 }} />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#ff3333' }}>{text1}</Text>
    </View>
  ),

  disableToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#cccccc',
        borderLeftWidth: 8,
        elevation: 2,
      }}
    >
      <MaterialIcons
        name="do-not-touch"
        size={24}
        color="#cccccc"
        style={{ marginHorizontal: 12 }}
      />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#cccccc' }}>{text1}</Text>
    </View>
  ),
};

const App = () => {
  const [userParse, setUserParse] = useState();
  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      axios.interceptors.request.use((config) => {
        config.headers.authorization = JSON.parse(user);
        return config;
      });
    });
  }, []);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Start"
            component={Start}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LogIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="ListCourses"
            component={ListCourses}
            options={{
              title: 'Kh??a h???c',
              ...HeaderStyles,
            }}
          />
          <Stack.Screen
            name="Lesson"
            component={Lesson}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListLesson"
            component={ListLesson}
            options={{
              title: '',
              ...HeaderStyles,
            }}
          />
          <Stack.Screen
            name="ChapterAdmin"
            component={ListChapterAdmin}
            options={({ navigation }) => ({
              title: 'Qu???n tr??? ch????ng',
              headerTitleAlign: 'center',
              ...HeaderStyles,
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => navigation.navigate('SettingAdmin')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="CourseAdmin"
            component={ListCourseAdmin}
            options={({ navigation }) => ({
              title: 'Qu???n tr??? kh??a h???c',
              ...HeaderStyles,
              headerTitleAlign: 'center',
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => navigation.navigate('SettingAdmin')}
                />
              ),
              headerLeft: () => null,
            })}
          />
          <Stack.Screen
            name="LessonAdmin"
            component={ListLessonAdmin}
            options={({ navigation }) => ({
              title: 'Qu???n tr??? b??i h???c',
              headerTitleAlign: 'center',
              ...HeaderStyles,
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => navigation.navigate('SettingAdmin')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddLesson"
            component={AddLesson}
            options={({ navigation }) => ({
              title: 'Kh??a h???c',
              ...HeaderStyles,
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => navigation.navigate('SettingAdmin')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="SettingAdmin"
            options={({ navigation }) => ({
              title: 'C??i ?????t',
              ...HeaderStyles,
            })}
            component={SettingAdmin}
          />
          <Stack.Screen
            name="EditLesson"
            component={EditLesson}
            options={({ navigation }) => ({
              title: 'Kh??a h???c',
              ...HeaderStyles,
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => navigation.navigate('C??i ?????t')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="T??i kho???n"
            options={({ navigation }) => ({
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => navigation.navigate('C??i ?????t')}
                />
              ),
              ...HeaderStyles,
            })}
            component={Account}
          />
          <Stack.Screen
            name="C??i ?????t"
            options={({ navigation }) => ({
              ...HeaderStyles,
            })}
            component={Setting}
          />
          <Stack.Screen
            name="Ch???nh s???a m???t kh???u"
            options={({ navigation }) => ({
              ...HeaderStyles,
            })}
            component={EditPass}
          />
          <Stack.Screen name="Ch???nh s???a t??i kho???n" options={() => ({})} component={EditProfile} />
        </Stack.Navigator>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
