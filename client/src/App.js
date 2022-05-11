import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

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
        console.log(typeof user);
        config.headers.authorization = JSON.parse(user);
        return config;
      });
    });
  }, []);

  return (
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
            title: 'Khóa học',
            ...HeaderStyles,
          }}
        />
        <Stack.Screen
          name="Tài khoản"
          options={({ navigation }) => ({
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={30}
                style={{ marginLeft: 20 }}
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <AntDesign
                name="setting"
                size={30}
                style={{ marginRight: 20 }}
                color="black"
                onPress={() => navigation.navigate('Cài đặt')}
              />
            ),
            ...HeaderStyles,
          })}
          component={Account}
        />
        <Stack.Screen
          name="Cài đặt"
          options={({ navigation }) => ({
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={30}
                style={{ marginLeft: 20 }}
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
          component={Setting}
        />
        <Stack.Screen
          name="Chỉnh sửa tài khoản"
          options={({ navigation, route }) => ({
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={30}
                style={{ marginLeft: 20 }}
                color="black"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <Feather name="check" size={30} style={{ marginRight: 20 }} color="black" />
            ),
          })}
          component={EditProfile}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default App;
