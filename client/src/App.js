import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import Account from './screens/Account';
import Toast from 'react-native-toast-message';
import Start from './screens/Start';
import SignUp from './screens/Auth/SignUp';
import LogIn from './screens/Auth/LogIn';
import Splash from './screens/Splash';
import Test from './screens/Test';
import Setting from './screens/Setting';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();

const App = () => {
  const [userParse, setUserParse] = useState();
  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      axios.interceptors.request.use((config) => {
        console.log(typeof user)
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
          name="Test"
          component={Test}
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
      <Toast />
    </NavigationContainer>
  );
};

export default App;
